import { Link } from 'react-router-dom'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import React from 'react';
import {searchHistory} from '../data';


const SearchHistory = ({  }) => {



	return (
		<ComponentContainerCard
			title="Search History"
			label="Today"
			menuItems={['Today', 'Yesterday', 'Last Week', 'Last Month']}
		>
			<div className="table-responsive dash-social">
				<table id="datatable" className="table table-bordered">
					<thead className="thead-light">
						<tr>
							<th>No</th>
							<th>Date</th>
							<th>Time</th>
							<th>From Currency</th>
							<th>To currency</th>
                            <th>Exchange Value</th>
							
						</tr>
					</thead>
					<tbody>
						{search.map((search, idx) => {
							return (
								<tr key={idx}>
									<td>{search.id}</td>
									<td>{search.date}</td>
									<td>{search.time}</td>
									<td>{search.fromCurrency}</td>
		                            <td>{search.toCurrency}</td>
									<td>${search.exchangeRate}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<nav aria-label="..." className="float-end">
				<ul className="pagination pagination-sm mb-0">
					<li className="page-item disabled">
						<Link className="page-link" to="" tabIndex={-1}>
							Previous
						</Link>
					</li>
					<li className="page-item active">
						<Link className="page-link" to="">
							1
						</Link>
					</li>
					<li className="page-item">
						<Link className="page-link" to="">
							2 <span className="sr-only">(current)</span>
						</Link>
					</li>
					<li className="page-item">
						<Link className="page-link" to="">
							3
						</Link>
					</li>
					<li className="page-item">
						<Link className="page-link" to="">
							Next
						</Link>
					</li>
				</ul>
			</nav>
		</ComponentContainerCard>
	)
}
export default SearchHistory
