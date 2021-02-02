/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { Card, CardBody, PanelRow, TextControl } from '@wordpress/components';

registerBlockType( 'alodge/vans-video-section', {
	title: __( 'Vans Video Section', 'alodge' ),
	icon: 'analytics',
	category: 'alodge',
	attributes: {
		youtubeLink: {
			type: 'string',
			default: 'https://www.youtube.com/embed/OZE3mqM2cfM',
		},
	},
	supports: {
		align: [ 'full' ],
	},
	edit: ( props ) => {
		// Lift info from props and populate various constants.
		const {
			attributes: { youtubeLink },
			className,
			setAttributes,
		} = props;

		const change = ( key ) => ( value ) => {
			setAttributes( { [ key ]: value } );
		};

		return [
			<InspectorControls>
				<Card>
					<CardBody>
						<PanelRow>
							<TextControl
								label="YouTube Link"
								placeholder={ __( 'Youtube URL', 'fueled-on-bacon' ) }
								value={ youtubeLink }
								onChange={ change( 'youtubeLink' ) }
							/>
						</PanelRow>
					</CardBody>
				</Card>
			</InspectorControls>,
			<section className={ className }>
				<div className="sub-hero">
					<InnerBlocks />
				</div>
				<div className="van-video">
					<iframe
						src={ youtubeLink }
						frameBorder="0"
						allowFullScreen="allowfullscreen"
					/>
				</div>
			</section>,
		];
	},
	save: ( props ) => {
		const {
			attributes: { youtubeLink },
		} = props;

		return (
			<section>
				<div className="sub-hero">
					<InnerBlocks.Content />
				</div>
				<div className="van-video">
					<iframe
						src={ youtubeLink }
						frameBorder="0"
						allowFullScreen="allowfullscreen"
					></iframe>
				</div>
			</section>
		);
	},
} );
