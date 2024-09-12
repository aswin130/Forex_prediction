import { Helmet } from 'react-helmet'
const PageMetaData = ({ title }) => {
	return (
		<Helmet>
			<title>{title} | Forex Forecast - Admin & Dashboard Template</title>
		</Helmet>
	)
}
export default PageMetaData
