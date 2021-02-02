const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
const { 
  BlockControls,
  AlignmentToolbar,
  InspectorControls,
  RichText,
} = wp.blockEditor
const { TextControl, Button } = wp.components

registerBlockType("alodge/button", {
  title: __("Button", "alodge"),
  icon: "analytics",
  category: "alodge",
  attributes: {
    buttonText: {
      type: "html",
      selector: ".alodge-button a",
      attribute: "html",
      default: "Call to action"
    },
    linkDestination: {
      type: "string",
      selector: ".alodge-button a",
      attribute: "href"
    },
    alignment: {
      type: "string",
      default: "left"
    }
  },
  styles: [
    {
        name: 'hollow-black',
        label: __( 'Hollow Black', "alodge" )
    },
    {
        name: 'hollow-white',
        label: __( 'Hollow White', "alodge" )
    }
  ],
  edit: props => {

    // Lift info from props and populate various constants.
    const {
      attributes: { 
        buttonText,
        linkDestination,
        alignment
      },
      className,
      setAttributes
    } = props;

    const changeButtonText = text => {
      setAttributes({ buttonText: text })
    }

    const changeLinkDestination = link => {
      setAttributes({linkDestination: link})
    }
    const changeAlignment = alignment => {
      setAttributes({alignment})
    }

    return [
      <InspectorControls>
        <TextControl
          label= 'Link URL'
          value= {linkDestination}
          onChange= {changeLinkDestination}
        />
      </InspectorControls>,
      <div className={className} style={{ textAlign: alignment}}>
        <BlockControls>
          <AlignmentToolbar 
            value={alignment}
            onChange={changeAlignment}
          />
        </BlockControls>
        <a className="cta" href="#">
          <RichText 
            value={buttonText}
            onChange={changeButtonText}
          />
        </a>
      </div>
    ];
  },
  save: props => {
    const {
      attributes: {
        buttonText,
        linkDestination,
        alignment
      },
    } = props;

    return (
      <div style={{ textAlign: alignment}}>
        <a className="cta" href={linkDestination}>
          <RichText.Content value={buttonText} />
        </a>
      </div>
    );
  }
});
