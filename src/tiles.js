/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { TextControl } from '@wordpress/components';
import '@wordpress/core-data';

registerBlockType( 'alodge/tiles', {
	title: __( 'Tiles', 'alodge' ),
	icon: 'analytics',
	category: 'alodge',
	attributes: {
    post_type: {
      type: String,
      default: 'post'
    },
    post_limit: {
      type: Number,
      default: 10
    },
  },
	edit: withSelect( ( select, {attributes} ) => {
    return ( {
      posts: select( 'core' ).getEntityRecords( 'postType', attributes.post_type ),
    } );
  } )( ( { posts, attributes , setAttributes} ) => {
    const arr = posts || [];
    const change = key => value => {
      setAttributes({ [key]: value });
    }

		return (
			<div>
        <TextControl
          value={attributes.post_type}
          onChange={change('post_type')}
          label="Post Type"
        />
        <ol>
				{ arr.map( ( post ) => (
					<li>{ post.title.rendered }</li>
				) ) }
        </ol>
			</div>
		);
	} ),
	save: ( props ) => {
		return null;
	},
} );
