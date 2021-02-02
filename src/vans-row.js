/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	MediaUpload,
	InnerBlocks,
	RichText,
} from '@wordpress/block-editor';
import { Button, Card, CardBody, PanelRow } from '@wordpress/components';

registerBlockType( 'alodge/vans-row', {
	title: __( 'Vans Row', 'alodge' ),
	icon: 'analytics',
	category: 'alodge',
	attributes: {
		images: {
			type: Array,
			default: [],
		},
		heading: {
			type: String,
			default: 'Heading',
		},
	},
	supports: {
		align: [ 'full' ],
	},
	edit: ( props ) => {
		// Lift info from props and populate various constants.
		const {
			attributes: { images, heading },
			className,
			setAttributes,
		} = props;

		const change = ( key ) => ( value ) => setAttributes( { [ key ]: value } );

		const pushImage = ( imageObject ) => {
			const arr = JSON.parse( JSON.stringify( images ) );
			arr.push( imageObject.url );
			setAttributes( { images: arr } );
		};
		const popItem = () => {
			const arr = JSON.parse( JSON.stringify( images ) );
			arr.pop();
			setAttributes( { images: arr } );
		};

		return [
			<InspectorControls>
				<Card>
					<CardBody>
						<PanelRow>
							<MediaUpload
								onSelect={ pushImage }
								type="image"
								value={ images }
								render={ ( { open } ) => (
									<Button
										className="change-image__button"
										onClick={ open }
										icon="format-image"
										showTooltip="true"
										label={ __( 'Add image to carousel.', 'alodge' ) }
									/>
								) }
							/>
							<div>Add Image to carousel</div>
						</PanelRow>
						<PanelRow>
							<Button
								className="change-image__button"
								onClick={ popItem }
								icon="format-image"
								showTooltip="true"
								label={ __( 'Remove image from carousel.', 'alodge' ) }
							/>
							<div>Remove last image.</div>
						</PanelRow>
					</CardBody>
				</Card>
			</InspectorControls>,
			<section className={ className }>
				<div className="carousel-gallery">
					{ images.map( ( image, key ) => (
						<img key={ key } src={ image } />
					) ) }
				</div>
				<div className="heading">
					<h1>
						<span>
							<RichText value={ heading } onChange={ change( 'heading' ) } />
						</span>
					</h1>
				</div>
				<div className="section-content">
					<InnerBlocks />
				</div>
			</section>,
		];
	},
	save: ( props ) => {
		const {
			attributes: { heading, images },
		} = props;

		return (
			<section>
				<div className="carousel-gallery">
					{ images.map( ( image, key ) => (
						<img key={ key } src={ image } />
					) ) }
				</div>
				<div className="heading">
					<h1>
						<span>
							<RichText.Content value={ heading } />
						</span>
					</h1>
				</div>
				<div className="section-content">
					<InnerBlocks.Content />
				</div>
			</section>
		);
	},
} );
