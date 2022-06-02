import { Box, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearch, IoEyeOutline} from 'react-icons/io5'

import '../pages/browse.css';

const Header = (): JSX.Element => {
	const [entry, setEntry] = useState<string>('');
	return (
		<>
			<Box className="browseheader">
				<Box className="browsetitle">
					<IoEyeOutline size={40}/>
					<Link to="/">Argos</Link>
				</Box>
				<div className="categories">
				</div>
				<div className="search">
					<input
						className="searchbar"
						placeholder="Search"
						style={{ borderBottom: '2px solid grey' }}
						value={entry}
						onChange={(e) => setEntry(e.target.value)}
					/>
					<Link to={`/home?search=${entry}`}>
						<Box className="loupe" style={{ borderBottom: '2px solid grey' }}>
							<IoSearch color="white" className="loupeimage" size={22}/>
						</Box>
					</Link>
				</div>
			</Box>
		</>
	);
};

export default Header;
