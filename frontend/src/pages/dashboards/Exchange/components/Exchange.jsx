import React, { useState, useEffect } from 'react';
import {ComponentContainerCard} from '@/components'
import {Col, Image, Row} from 'react-bootstrap'
import {Link, Navigate, Route} from 'react-router-dom'
import btc from '@/assets/images/logos/btc.png'
import {allAdminRoutes} from "@/routes/index.jsx";
import VerticalLayout from "@/layout/VerticalLayout.jsx";
import {currencyList} from '../currency.js'

const BuyCoins = () => {
    const [exchangeRate, setExchangeRate] = useState(null);
    const [toCurrency, setToCurrency] = useState('GBP');
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [error, setError] = useState(null);
    const fromCurrency = 'GBP'; // Always set to GBP

    // Fetch the exchange rate based on fromCurrency (GBP) and toCurrency
    useEffect(() => {
        const fetchConversionRates = async () => {
            try {
                const response = await fetch(`https://v6.exchangerate-api.com/v6/d2ef6900649119ef7c4b3ca6/pair/GBP/${toCurrency}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch conversion rates');
                }
                const data = await response.json();
                setExchangeRate(data.conversion_rate); // Assuming the API returns the conversion rate in this field
                setError(null);
            } catch (error) {
                setError(error.message);
            }
        };

        if (toCurrency) {
            fetchConversionRates();
        }
    }, [toCurrency]);

    // Perform currency conversion when amount or exchange rate changes
    useEffect(() => {
        if (amount > 0 && exchangeRate !== null) {
            setConvertedAmount((amount * exchangeRate).toFixed(2));
        } else {
            setConvertedAmount(0);
        }
    }, [amount, exchangeRate]);

    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        setAmount(isNaN(value) ? 0 : value); // Default to 0 if NaN
    };

    // Log the conversion history to the backend
    // const logHistory = async () => {
    //     try {
    //         const historyData = {
    //             date: Date.now(), // Use current timestamp as the date
    //             userName: 'JohnDoe', // Replace with actual user data if available
    //             fromCurrency: fromCurrency,
    //             toCurrency: toCurrency,
    //             exchangeRate: exchangeRate
    //         };

    //         // Post request to backend to log the conversion history
    //         await axios.post('http://localhost:8080/api/history/log', historyData);

    //         console.log('Conversion history logged successfully.');
    //     } catch (error) {
    //         console.error('Error logging conversion history:', error);
    //     }
    // };

    return (
        <ComponentContainerCard title="Currency Converter">
            <form>
                {/* Input for amount */}
                <div className="input-group mb-3">
                    <span className="input-group-text">From Currency</span>
                    <input
                    type="number"
                    className="form-control"
                    aria-label="Amount"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                        // type="number"
                        // className="form-control"
                        // aria-label="Amount"
                        // value={amount}
                        // onChange={handleAmountChange}
                    />
                    <span className="input-group-text">GBP</span> {/* From currency is always GBP */}
                </div>

                {/* Currency selection */}
                <div className="input-group mb-3">
                <span className="input-group-text">To Currency</span>
                    <select
                        className="form-select w-25"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        aria-label="Select to currency"
                    >
                        {currencyList.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Display total result */}
                <div className="input-group mb-3">
                    <span className="input-group-text">Exchange Amount</span>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Converted amount"
                        value={convertedAmount}
                        readOnly
                    />
                </div>

                {/* <div className="mt-3 ms-auto">
                    <Link to="" className="btn btn-success btn-sm">
                        Convert
                    </Link>
                </div> */}
            </form>

            {/* Display error if any */}
            {error && <div className="alert alert-danger">{error}</div>}

            <hr className="hr-dashed" />

            {/* Display last trade */}
            <h6 className="mt-0">Recent Search</h6>
            <Row>
                <Col>
                    <div className="media">
                        {/* <Image
                            src={btc}
                            height={30}
                            className="me-2 align-self-center rounded"
                            alt="BTC logo"
                        /> */}
                        <div className="media-body align-self-center">
                            <h6 className="m-0">{toCurrency}</h6>
                            <p className="mb-0 text-muted">{exchangeRate}</p>
                        </div>
                    </div>
                </Col>
                {/* <Col xs="auto" className="align-self-center">
                    <p className="mb-0 text-success">0.95842536</p>
                    <p className="mb-0 text-muted">$17,214</p>
                </Col> */}
            </Row>
        </ComponentContainerCard>
    );
    
    // return (
    //     // <ComponentContainerCard title="Currency Converter ">
    //     //     <form>
    //     //         <div className="input-group mb-3">
    //     //             <span className="input-group-text">Amount</span>
    //     //             <input
    //     //                 type="number"
    //     //                 className="form-control"
    //     //                 aria-label="Amount"
    //     //                 value={amount}
    //     //                 onChange={(e) => setAmount(parseFloat(e.target.value))}
    //     //                 // type="text"
    //     //                 // className="form-control"
    //     //                 // aria-label="Amount (to the nearest dollar)"
    //     //             />
                    
    //     //             {/* <span className="input-group-text">{fromCurrency}</span>
    //     //             <input
    //     //                 type="number"
    //     //                 className="form-control"
    //     //                 aria-label="Amount"
    //     //                 value={amount}
    //     //                 // onChange={(e) => setAmount(parseFloat(e.target.value))}
    //     //                 // type="text"
    //     //                 // className="form-control"
    //     //                 // aria-label="Amount (to the nearest dollar)"
    //     //             />*/}
    //     //             <span className="input-group-text">{fromCurrency}</span>
    //     //         </div>
    //     //         <div className="input-group mb-3">
    //     //             <select
    //     //                 className="form-select w-25"
    //     //                 // aria-label="Default select example"
    //     //                 value={fromCurrency}
    //     //                 onChange={(e) => setFromCurrency(e.target.value)}
    //     //                 aria-label="Select from currency"
    //     //             >
    //     //                 {currencyList.map((currency) => (
    //     //                     <option key={currency}>{currency}</option>
    //     //                 ))}
    //     //             </select>

    //     //             <select
    //     //                 className="form-select w-25"
    //     //                 // aria-label="Default select example"
    //     //                 value={toCurrency}
    //     //                 onChange={(e) => setFromCurrency(e.target.value)}
    //     //                 aria-label="Select from currency"
    //     //             >
    //     //                 {currencyList.map((currency) => (
    //     //                     <option key={currency}>{currency}</option>
    //     //                 ))}
    //     //             </select>
                    
    //     //             {/*<input*/}
    //     //             {/*    type="text"*/}
    //     //             {/*    className="form-control"*/}
    //     //             {/*    aria-label="Amount"*/}
    //     //             {/*    placeholder="$25,000"*/}
    //     //             {/*/>*/}
    //     //             {/*<span className="input-group-text">$ Dollor</span>*/}
    //     //         </div>
    //     //         <div className="input-group mb-3">
    //     //             <span className="input-group-text">Total</span>
    //     //             <input
    //     //                 type="text"
    //     //                 className="form-control"
    //     //                 aria-label="Converted amount"
    //     //                 value={convertedAmount}
    //     //                 readOnly
    //     //                 // type="text"
    //     //                 // className="form-control"
    //     //                 // aria-label="Amount (to the nearest dollar)"
    //     //             />
    //     //         </div>
    //     //         <div className=" mt-3 ms-auto">
    //     //             {/*<Link to="" className="btn btn-success btn-sm">*/}
    //     //             <Link to="" className="btn btn-success btn-sm" onClick={convertCurrency}>
    //     //                 Convert
    //     //             </Link>
    //     //         </div>
    //     //     </form>
    //     //     <hr className="hr-dashed"/>
    //     //     <h6 className="mt-0">Last Trade</h6>
    //     //     <Row>
    //     //         <Col>
    //     //             <div className="media">
    //     //                 <Image
    //     //                     src={btc}
    //     //                     height={30}
    //     //                     className="me-2 align-self-center rounded"
    //     //                     alt="..."
    //     //                 />
    //     //                 <div className="media-body align-self-center">
    //     //                     <h6 className="m-0">BTC</h6>
    //     //                     <p className="mb-0 text-muted">$50,562.24</p>
    //     //                 </div>
    //     //             </div>
    //     //         </Col>
    //     //         <Col xs="auto" className="align-self-center">
    //     //             <p className="mb-0 text-success">0.95842536</p>
    //     //             <p className="mb-0 text-muted">$17,214</p>
    //     //         </Col>
    //     //     </Row>
    //     // </ComponentContainerCard>
    // )
};
export default BuyCoins
