import React from 'react';
import { Text, Box, Input, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { url } from 'inspector';
import './home.css';

const options = [
	{ label: 'Français', value: 'Français' },
	{ label: 'English', value: 'English' },
];

const App = (): JSX.Element => (
	<>
		<div className="homebackground">
			<div className="header">
				<div className="topmenu">
					<div className="title">
						<Link to="/">FLIXNET</Link>
					</div>
					<Box className="connection" width="20em">
						<Link to="/login">
							<Box className="bouton" color="white" fontWeight="400" width="7em">
								s'identifier
							</Box>
						</Link>
					</Box>
				</div>
			</div>
			<div className="description">
				<div className="produit">Films, séries TV et bien plus en illimité.</div>
				<div className="annulez">Où que vous soyez. Annulez à tout moment.</div>
				<div className="saisissez">
					Prêt à regarder Flixnet ? Saisissez votre adresse e-mail pour vous abonner ou réactiver votre abonnement.
				</div>
				<Box className="entermail" height="3em" width="50em">
					<Input height="4.5em" backgroundColor="white" borderEndRadius="0" placeholder="Adresse e-mail" />
					<Link to="/register">
						<Box className="startbutton" width="13em" height="3em" borderEndRadius="0.2em">
							Commencer
						</Box>
					</Link>
				</Box>
			</div>
		</div>
	</>
);

export default App;
