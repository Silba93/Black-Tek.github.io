import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://github.com/Black-Tek/Black-Tek.github.io',
	integrations: [
		starlight({
			title: 'BlackTek',
			logo: {
				light: '/src/assets/blacktek.png',
				dark: '/src/assets/blacktek.png',
				replacesTitle: false,
			},
			social: {
				github: 'https://github.com/Black-Tek/BlackTek-Server',
			},
			sidebar: [
				{
					label: 'BlackTek',
					collapsed: true,
					items: [
						{ label: 'Welcome To BlackTek', slug: 'blacktek/welcome' },
					],
				},
				{
					label: 'Lua',
					collapsed: true,
					autogenerate: { directory: 'Lua' },
				},
				{
					label: 'Server',
					collapsed: true,
					autogenerate: { directory: 'Server' },
				},
				{
					label: 'Mapeditor',
					collapsed: true,
					autogenerate: { directory: 'Mapeditor' },
				},
			],
		}),
	],
});
