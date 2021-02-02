const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  InspectorControls,
  MediaUpload,
  RichText,
  InnerBlocks,
} = wp.blockEditor;
const { Button } = wp.components;

registerBlockType("alodge/page-hero-freeform", {
  title: __("Page Hero Freeform content", "alodge"),
  icon: "analytics",
  category: "alodge",
  attributes: {
    heading: {
      type: "string",
      default: "Title",
    },
    desktopBackground: {
      type: "string",
      default: "https://via.placeholder.com/600x400.jpg",
    },
    mobileBackground: {
      type: "string",
      default: "https://via.placeholder.com/400x600.jpg",
    },
  },
  supports: {
    align: ["full"],
  },
  edit: (props) => {
    // Lift info from props and populate various constants.
    const {
      attributes: {
        desktopBackground,
        mobileBackground,
        heading,
      },
      className,
      setAttributes,
    } = props;

    const onChangeString = (key) => (value) => {
      setAttributes({ [key]: value });
    };

    const onImageSelect = (key) => (imageObject) => {
      setAttributes({ [key]: imageObject.sizes.full.url });
    };

    return [
      <InspectorControls>
        <div>Desktop Background</div>
        <div>
          <MediaUpload
            onSelect={onImageSelect("desktopBackground")}
            type="image"
            value={desktopBackground}
            render={({ open }) => (
              <Button
                className="change-image__button"
                onClick={open}
                icon="format-image"
                showTooltip="true"
                label={__("Change desktop image.", "alodge")}
              />
            )}
          />
        </div>
        <div>Mobile Background</div>
        <div>
          <MediaUpload
            onSelect={onImageSelect("mobileBackground")}
            type="image"
            value={mobileBackground}
            render={({ open }) => (
              <Button
                className="change-image__button"
                onClick={open}
                icon="format-image"
                showTooltip="true"
                label={__("Change mobile image.", "alodge")}
              />
            )}
          />
        </div>
      </InspectorControls>,
      <section className={className}>
        <div
          className="image desktop"
          style={{ backgroundImage: `url(${desktopBackground})` }}
        />
        <div
          className="image mobile"
          style={{ backgroundImage: `url(${mobileBackground})` }}
        />
        <div className="large-heading">
          <h1>
            <span>
            <RichText
              placeholder={__("Heading", "alodge")}
              value={heading}
              onChange={onChangeString("heading")}
            />
            </span>
          </h1>
        </div>
        <div className="copy-area">
          <InnerBlocks />
        </div>
      </section>,
    ];
  },
  save: (props) => {
    const {
      attributes: {
        desktopBackground,
        mobileBackground,
        heading,
      },
    } = props;

    return (
      <section>
        <div
          className="image desktop"
          style={{ backgroundImage: `url(${desktopBackground})` }}
        />
        <div
          className="image mobile"
          style={{ backgroundImage: `url(${mobileBackground})` }}
        />
        <div className="large-heading">
          <h1>
            <span>
              <RichText.Content value={heading} />
            </span>
          </h1>
        </div>
        <div className="copy-area">
          <InnerBlocks.Content />
        </div>
      </section>
    );
  },
});
