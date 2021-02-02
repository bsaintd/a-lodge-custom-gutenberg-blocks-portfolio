/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, MediaUpload, InnerBlocks } from '@wordpress/block-editor';
import { Button, Card, CardBody, PanelRow } from '@wordpress/components';

registerBlockType( 'alodge/vans-hero', {
	title: __( 'Vans Hero', 'alodge' ),
	icon: 'analytics',
	category: 'alodge',
	attributes: {
		desktopBackground: {
			type: 'string',
			default: 'https://via.placeholder.com/1920x1080.jpg',
		},
		mobileBackground: {
			type: 'string',
			default: 'https://via.placeholder.com/1920x1080.jpg',
		},
	},
	supports: {
		align: [ 'full' ],
	},
	edit: ( props ) => {
		// Lift info from props and populate various constants.
		const {
			attributes: {
				desktopBackground,
				mobileBackground,
			},
			className,
			setAttributes,
		} = props;

		const onImageSelect = ( key ) => ( imageObject ) => {
			setAttributes( { [ key ]: imageObject.url } );
		};

		return [
			<InspectorControls>
				<Card>
					<CardBody>
						<PanelRow>
							<div>Desktop Background</div>
							<div>
								<MediaUpload
									onSelect={ onImageSelect( 'desktopBackground' ) }
									type="image"
									value={ desktopBackground }
									render={ ( { open } ) => (
										<Button
											className="change-image__button"
											onClick={ open }
											icon="format-image"
											showTooltip="true"
											label={ __( 'Change desktop image.', 'alodge' ) }
										/>
									) }
								/>
							</div>
						</PanelRow>
						<PanelRow>
							<div>Mobile Background</div>
							<div>
								<MediaUpload
									onSelect={ onImageSelect( 'mobileBackground' ) }
									type="image"
									value={ mobileBackground }
									render={ ( { open } ) => (
										<Button
											className="change-image__button"
											onClick={ open }
											icon="format-image"
											showTooltip="true"
											label={ __( 'Change mobile image.', 'alodge' ) }
										/>
									) }
								/>
							</div>
						</PanelRow>
					</CardBody>
				</Card>
			</InspectorControls>,
			<section className={ className }>
				<div
					className="background desktop"
					style={ { backgroundImage: `url(${ desktopBackground })` } }
				/>
				<div
					className="background mobile"
					style={ { backgroundImage: `url(${ mobileBackground })` } }
				/>
				<div className="section-content">
					<InnerBlocks />
				</div>
			</section>,
		];
	},
	save: ( props ) => {
		const {
			attributes: {
				desktopBackground,
				mobileBackground,
			},
		} = props;

		return (
			<section>
				<div
					className="background desktop"
					style={ { backgroundImage: `url(${ desktopBackground })` } }
				/>
				<div
					className="background mobile"
					style={ { backgroundImage: `url(${ mobileBackground })` } }
				/>
				<div className="section-content">
					<InnerBlocks.Content />
				</div>
			</section>
		);
	},
} );
