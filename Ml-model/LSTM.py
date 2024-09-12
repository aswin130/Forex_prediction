import pandas as pd
import numpy as np
from keras.api.models import Sequential
from keras.api.layers import Dense, LSTM, Dropout
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error


# Load the dataset
file_path = 'eurodataset.csv'
data = pd.read_csv(file_path)

# Convert 'Date' to datetime format and set as index
data['Date'] = pd.to_datetime(data['Date'])
data.set_index('Date', inplace=True)

# Drop 'Volume' column as it contains only zeros
data = data.drop(columns=['Volume'])

# Check for and handle missing values
data = data.dropna()

# Normalize the data using MinMaxScaler
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(data)
scaled_data = pd.DataFrame(scaled_data, columns=data.columns, index=data.index)

# Function to create sequences of data
def create_sequences(data, time_steps):
    X, y = [], []
    for i in range(len(data) - time_steps):
        X.append(data[i:i + time_steps])
        y.append(data[i + time_steps])
    return np.array(X), np.array(y)

# Initial time steps for sequence creation (this will be tuned)
time_steps = 10
X, y = create_sequences(scaled_data.values, time_steps)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

# Define a function to create the LSTM model
def create_lstm_model(units=50, dropout_rate=0.2):
    model = Sequential()
    model.add(LSTM(units=units, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
    model.add(Dropout(dropout_rate))
    model.add(LSTM(units=units))
    model.add(Dropout(dropout_rate))
    model.add(Dense(units=X_train.shape[2]))
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

# Check for NaNs in y_train and y_test
print(f"NaNs in y_train: {np.isnan(y_train).sum()}")
print(f"NaNs in y_test: {np.isnan(y_test).sum()}")

# Define a function to evaluate the model with given parameters
def evaluate_model(X_train, y_train, X_val, y_val, units, dropout_rate, epochs, batch_size):
    model = create_lstm_model(units=units, dropout_rate=dropout_rate)
    model.fit(X_train, y_train, epochs=epochs, batch_size=batch_size, verbose=0)

    y_pred = model.predict(X_val)

    # Check for NaNs in predictions
    if np.isnan(y_pred).sum() > 0:
        print(f"NaNs in y_pred: {np.isnan(y_pred).sum()}")
        return float('inf')

    return mean_squared_error(y_val, y_pred)

# Parameter grid for manual search
param_grid = {
    'units': [50, 100, 150],
    'dropout_rate': [0.2, 0.3, 0.4],
    'epochs': [10, 20, 30],
    'batch_size': [32, 64, 128]
}

# Split training data further into training and validation sets
X_train_split, X_val_split, y_train_split, y_val_split = train_test_split(X_train, y_train, test_size=0.2, shuffle=False)

# Manual hyperparameter search
best_score = float('inf')
best_params = {}

for units in param_grid['units']:
    for dropout_rate in param_grid['dropout_rate']:
        for epochs in param_grid['epochs']:
            for batch_size in param_grid['batch_size']:
                score = evaluate_model(X_train_split, y_train_split, X_val_split, y_val_split, units, dropout_rate, epochs, batch_size)
                if score < best_score:
                    best_score = score
                    best_params = {
                        'units': units,
                        'dropout_rate': dropout_rate,
                        'epochs': epochs,
                        'batch_size': batch_size
                    }

print(f"Best parameters: {best_params}")

# Train and save the best model
best_model = create_lstm_model(units=best_params['units'], dropout_rate=best_params['dropout_rate'])
best_model.fit(X_train, y_train, epochs=best_params['epochs'], batch_size=best_params['batch_size'])

# Save the model
best_model.save('best_lstm_model.h5')

# Assuming you have training data
best_model.fit(X_train, y_train, epochs=1, batch_size=32, verbose=0)

# Or evaluate the model
best_model.evaluate(X_test, y_test)
