import React from 'react';
import { createRoot } from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';

import App from './app/App';

import theme from './theme';
import './theme/index.css';

const root : any = document.getElementById('root');
createRoot(root).render(
	<ChakraProvider theme={theme} resetCSS>
		<App />
	</ChakraProvider>
);