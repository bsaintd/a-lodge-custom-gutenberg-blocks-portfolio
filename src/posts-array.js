
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
  RichText,
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import '@wordpress/core-data';

registerBlockType('alodge/posts-array', {
  title: __('Posts array', 'alodge'),
  icon: 'analytics',
  category: 'alodge',
  edit: withSelect((select) => {
    return {
      posts: select('core').getEntityRecords('postType', 'post') || []
    }
  })
    (({ posts, className }) => {

      return (
        <section className={className}>
          {posts.map((post, key) => (
            <div key={key}>
              <RichText.Content value={post.title.rendered} />
            </div>
          ))}
        </section>
      );
    }),
  save: ({ posts }) => {
    const arr = posts || []
    return (
      <section>
        { arr.map((post, key) => (
          <div key={key}>
            <RichText.Content value={post.title.rendered} />
          </div>
        )) }
      </section>
    );
  },
});
