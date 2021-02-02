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

registerBlockType("alodge/toc-document", {
  title: __("Table of Contents Document", "alodge"),
  icon: "analytics",
  category: "alodge",
  attributes: {
    heading: {
      type: "string",
      default: "More from A-Lodge"
    },
  },
  supports: {
    align: ['full'],
  },
  edit: props => {

    const {
      attributes: {
        heading
      },
      className,
      setAttributes
    } = props;

    const c = (key) => value => {
      setAttributes({ [key]: value })
    }

    return (
      <div className={`${className}`}>
        <div className="main build-toc">
          <InnerBlocks/>
        </div>
        <div class="sidebar">
          <div class="table-of-contents">
            <h3 class="underline">
              <RichText
                value={heading}
                onChange={c('heading')}
              />
            </h3>
            <div class="list">
            </div>
          </div>
        </div>
      </div>
    );
  },
  save: props => {
    const {
      attributes: {
        heading
      },
    } = props;

    return (
      <div>
        <div className="main build-toc">
          <InnerBlocks.Content/>
        </div>
        <div class="sidebar">
          <div class="table-of-contents">
            <h3 class="underline">
              <RichText.Content value={heading} />
            </h3>
            <div class="list">
            </div>
          </div>
        </div>
      </div>
    );
  }
});
