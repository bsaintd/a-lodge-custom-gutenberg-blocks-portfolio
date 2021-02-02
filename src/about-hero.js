const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  InspectorControls,
  MediaUpload,
  RichText,
  InnerBlocks,
} = wp.blockEditor;
const {
  Button,
  Card,
  CardBody,
  PanelRow
} = wp.components;

registerBlockType("alodge/about-hero", {
  title: __("About Hero Block", "alodge"),
  icon: "analytics",
  category: "alodge",
  attributes: {
    image: {
      type: "string",
      default: "https://via.placeholder.com/600x800.jpg"
    },
  },
  supports: {
    align: ['full'],
  },
  edit: props => {

    const {
      attributes: {
        image,
      },
      className,
      setAttributes
    } = props;

    const onChangeImage = (key) => imageObject => {
      setAttributes({ [key]: imageObject.url })
    }
    const c = (key) => value => {
      setAttributes({ [key]: value })
    }

    return [
      <InspectorControls>
        <Card>
          <CardBody>
            <PanelRow>
              <div>
                <MediaUpload
                  onSelect={onChangeImage('image')}
                  type="image"
                  value={image}
                  render={({ open }) => (
                    <Button
                      className="change-image__button"
                      onClick={open}
                      icon="format-image"
                      showTooltip="true"
                      label={__("Change image.", "alodge")}
                    />
                  )}
                />
              </div>
              <div>
                Team photo
              </div>
            </PanelRow>
          </CardBody>
        </Card>
      </InspectorControls>,
      <section className={`${className} about-hero-block`}>
        <div className="area-container">
          <div
            className="copy"
            style={{
              backgroundColor: "#ededed"
            }}
          >
            <InnerBlocks/>
          </div>
          <div
            className="image-area"
            style={{
              backgroundImage: `url(${image})`
            }}
          />
        </div>
      </section>
    ];
  },
  save: props => {
    const {
      attributes: {
        image,
        heading
      },
    } = props;

    return (
      <section className="about-hero-block">
        <div className="area-container">
          <div
            className="copy"
            style={{
              backgroundColor: "#ededed"
            }}
          >
            <InnerBlocks.Content/>
          </div>
          <div
            className="image-area"
            style={{
              backgroundImage: `url(${image})`
            }}
          />
        </div>
      </section>
    );
  }
});
