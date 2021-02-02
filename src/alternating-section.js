const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
	MediaUpload,
	RichText,
	InnerBlocks,
} = wp.blockEditor;
const { Button } = wp.components;

registerBlockType( 'alodge/alternating-section', {
	title: __( 'Alternating Section', 'alodge' ),
	icon: 'analytics',
	category: 'alodge',
	attributes: {
		heading: {
			type: 'string',
			default: 'Title',
		},
		subheading: {
			type: 'string',
			default: 'The subheading title',
		},
		tagline: {
			type: 'string',
			default: 'The subheading title',
		},
		copy: {
			type: 'string',
			default: "Here's some words that can go here now",
		},
		desktopBackground: {
			type: 'string',
			default: 'https://via.placeholder.com/400x150.jpg',
		},
		mobileBackground: {
			type: 'string',
			default: 'https://via.placeholder.com/400x150.jpg',
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
				heading,
				subheading,
				tagline,
				copy,
			},
			className,
			setAttributes,
		} = props;

		const onChangeString = ( key ) => ( value ) => {
			setAttributes( { [ key ]: value } );
		};

		const onImageSelect = ( key ) => ( imageObject ) => {
			setAttributes( { [ key ]: imageObject.sizes.full.url } );
		};

		return [
			<InspectorControls>
				<div>
					Desktop Background
				</div>
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
				<div>
					Mobile Background
				</div>
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
			</InspectorControls>,
			<section className={ className }>
				<div className="background desktop" style={ { backgroundImage: `url(${ desktopBackground })` } } />
				<div className="background mobile" style={ { backgroundImage: `url(${ mobileBackground })` } } />
				<div className="section-inner">
					<h1>
						<RichText
							placeholder={ __( 'Heading', 'alodge' ) }
							value={ heading }
							onChange={ onChangeString( 'heading' ) }
						/>
					</h1>
					<h3 className="heading">
						<RichText
							placeholder={ __( 'Subheading', 'alodge' ) }
							value={ subheading }
							onChange={ onChangeString( 'subheading' ) }
						/>
					</h3>
					<div className="content-area">
						<h3>
							<RichText
								placeholder={ __( 'Tagline', 'alodge' ) }
								value={ tagline }
								onChange={ onChangeString( 'tagline' ) }
							/>
						</h3>
						<div className="copy">
							<RichText
								placeholder={ __( 'Copy', 'alodge' ) }
								value={ copy }
								onChange={ onChangeString( 'copy' ) }
							/>
						</div>
						<div className="actions">
							<InnerBlocks />
						</div>
					</div>
				</div>
			</section>,
		];
	},
	save: ( props ) => {
		const {
			attributes: {
				desktopBackground,
				mobileBackground,
				heading,
				subheading,
				tagline,
				copy,
			},
		} = props;

		return (
			<section>
				<div className="background desktop" style={ { backgroundImage: `url(${ desktopBackground })` } } />
				<div className="background mobile" style={ { backgroundImage: `url(${ mobileBackground })` } } />
				<div className="section-inner">
					<h1>
						<RichText.Content value={ heading } />
					</h1>
					<h3 className="heading">
						<RichText.Content value={ subheading } />
					</h3>
					<div className="content-area">
						<h3>
							<RichText.Content value={ tagline } />
						</h3>
						<div className="copy">
							<RichText.Content value={ copy } />
						</div>
						<div className="actions">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</section>
		);
	},
} );
