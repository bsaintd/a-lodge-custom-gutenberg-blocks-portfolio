const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
const { 
  BlockControls,
  InspectorControls,
  MediaUpload,
  InnerBlocks,
} = wp.blockEditor
const { TextControl, Button } = wp.components

registerBlockType("alodge/cover", {
  title: __("Cover block", "alodge"),
  icon: "analytics",
  category: "alodge",
  attributes: {
    desktopBackground: {
      type: "string",
      default: "https://via.placeholder.com/400x150.jpg"
    },
    mobileBackground: {
      type: "string",
      default: "https://via.placeholder.com/400x150.jpg"
    },
    desktopBackgroundHeight: {
      type: "number",
      default: 300
    },
    mobileBackgroundHeight: {
      type: "number",
      default: 300
    },
    desktopSectionHeight: {
      type: "number",
      default: 300
    },
    mobileSectionHeight: {
      type: "number",
      default: 300
    },
    id: {
      type: "string",
      default: 1
    }
  },
  supports: {
    align: ['full'],
  },
  edit: props => {

    // Lift info from props and populate various constants.
    const {
      attributes: { 
        desktopBackground,
        mobileBackground,
        desktopBackgroundHeight,
        mobileBackgroundHeight,
        desktopSectionHeight,
        mobileSectionHeight,
        id
      },
      className,
      setAttributes
    } = props;

    const onDesktopBackgroundSelect = imageObject => {
      setAttributes({ desktopBackground: imageObject.sizes.full.url });
    };
    const onMobileBackgroundSelect = imageObject => {
      setAttributes({ mobileBackground: imageObject.sizes.full.url });
    };
    const setHeight = key =>
      height => {
        setAttributes({ [key]: Number(height) })
      }
    const changeId = id =>{
      setAttributes({ id })
    }
    return [
      <InspectorControls>
        <div>
          Desktop Background
        </div>
        <div>
          <MediaUpload
            onSelect={onDesktopBackgroundSelect}
            type="image"
            value={desktopBackground}
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
          Mobile Background 
        </div>
        <div>
          <MediaUpload
            onSelect={onMobileBackgroundSelect}
            type="image"
            value={mobileBackground}
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
        <TextControl
          label= 'ID'
          value= {id}
          onChange= {changeId}
        />
        <TextControl
          label= 'Desktop Background Height'
          value= {desktopBackgroundHeight}
          onChange= {setHeight('desktopBackgroundHeight')}
        />
        <TextControl
          label= 'Desktop Section Height'
          value= {desktopSectionHeight}
          onChange= {setHeight('desktopSectionHeight')}
        />
        <TextControl
          label= 'Mobile Background Height'
          value= {mobileBackgroundHeight}
          onChange= {setHeight('mobileBackgroundHeight')}
        />
        <TextControl
          label= 'Mobile Section Height'
          value= {mobileSectionHeight}
          onChange= {setHeight('mobileSectionHeight')}
        />
        </div>
      </InspectorControls>,
      <div className={`${className} alodge-cover alodge-cover-${id}`}>
        <style>{`
        .alodge-cover-${id}{
          position: relative;
          height: calc(${desktopSectionHeight} / 1920 * 100vw);
        }
        @media(max-width: 414px){ .alodge-cover-${id}{ height: calc(${mobileSectionHeight} /  414 * 100vw); } }
      `}</style>
          <BlockControls/>
          <div className="background desktop" style={{backgroundImage: `url(${desktopBackground})`, height: `calc(${desktopBackgroundHeight} / 1920 * 100vw)` }}/>
          <div className="background mobile" style={{backgroundImage: `url(${mobileBackground})`, height: `calc(${mobileBackgroundHeight} / 414 * 100vw)` }}/>
          <div className="inner-content">
            <InnerBlocks/>
          </div>
      </div>
    ];
  },
  save: props => {
    const {
      attributes: {
        desktopBackground,
        mobileBackground,
        desktopBackgroundHeight,
        mobileBackgroundHeight,
        desktopSectionHeight,
        mobileSectionHeight,
        id
      },
    } = props;

    return (
      <div className={`alodge-cover alodge-cover-${id}`}>
        <style>{`
          .alodge-cover-${id}{
            position: relative;
            height: calc(${desktopSectionHeight} / 1920 * 100vw);
          }
          @media(max-width: 414px){ .alodge-cover-${id} { height: calc(${mobileSectionHeight} /  414 * 100vw); } }
        `}</style>
        <div className="background desktop" style={{backgroundImage: `url(${desktopBackground})`, height: `calc(${desktopBackgroundHeight} / 1920 * 100vw)`}}/>
        <div className="background mobile" style={{backgroundImage: `url(${mobileBackground})`, height: `calc(${mobileBackgroundHeight} / 414 * 100vw)`}}/>
        <div className="inner-content">
          <InnerBlocks.Content/>
        </div>
      </div>
    );
  }
});
