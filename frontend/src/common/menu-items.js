const TWO_COl_MENU_ITEMS = [
	{
		key: 'dashboard',
		icon: 'smart-home',
		label: 'Dashboard',
		isTitle: true,
		children: [
			
			{
				key: 'ds-crypto',
				label: 'Forex charts',
				url: '/dashboards/crypto',
				parentKey: 'dashboard',
			},
			{
				key: 'crypto-exchange',
				label: 'Exchange',
				url: '/dashboards/exchange',
				parentKey: 'apps-crypto',
			}
			
		],
	},
]
export { TWO_COl_MENU_ITEMS }
