import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

// Set breakpoint to help to make the app responsive.
const breakpoints = createBreakpoints({
	xs: '320px',
	sm: '576px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1440px',
});

const overrides = {
	breakpoints,
};

export default extendTheme(overrides);