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

registerBlockType("alodge/about-content-section", {
  title: __("About content section", "alodge"),
  icon: "analytics",
  category: "alodge",
  attributes: {
    heading: {
      type: "string",
      default: "Heading"
    },
    subheading: {
      type: "string",
      default: "Subheading"
    },
  },
  edit: props => {

    const {
      attributes: {
        heading,
        subheading
      },
      className,
      setAttributes
    } = props;

    const c = (key) => value => {
      setAttributes({ [key]: value })
    }

    return (
      <section className={className}>
        <h4 className="heading dark">
          <RichText
            placeholder={__("Heading", "alodge")}
            value={heading}
            onChange={c('heading')}
          />
        </h4>
        <h3 className="red">
          <RichText
            placeholder={__("Subheading", "alodge")}
            value={subheading}
            onChange={c('subheading')}
          />
        </h3>
        <InnerBlocks />
      </section>
    );
  },
  save: props => {
    const {
      attributes: {
        heading,
        subheading
      },
    } = props;

    return (
      <section>
        <h4 className="heading dark">
          <RichText.Content value={heading} />
        </h4>
        <h3 className="red">
          <RichText.Content value={subheading} />
        </h3>
        <InnerBlocks.Content />
      </section>
    );
  }
});
