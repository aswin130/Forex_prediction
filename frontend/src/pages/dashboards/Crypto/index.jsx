import { Col, Row } from 'react-bootstrap'
import CryptoChart from './components/CryptoChart'
import CryptoTopbar from './components/CryptoTopbar'

import { PageBreadcrumb } from '@/components'
const Crypto = () => {
	return (
		<>
			<PageBreadcrumb subName="Dashboard" title="Forex" />
			<Row>
				<Col lg={12}>
					<CryptoTopbar />
				</Col>
			</Row>
			<Row>
				<Col lg={12}>
					<CryptoChart />
				</Col>
			</Row>
		</>
	)
}
export default Crypto
