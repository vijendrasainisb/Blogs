'use strict';

/**
 * A set of functions called "actions" for `custom`
 */

module.exports = {
  GetMessage: async (ctx, next) => {
    try {
      const Body = ctx.request.body;
      // console.log(Body.Title,'sss', Body);
      if (!Body || !Body.Title) {
        ctx.throw(400, 'Title is required field');
      }

      const { Title, Description, Image, Status } = Body;

      // Check if a blog with the same title already exists
      const existingBlog = await strapi.entityService.findMany('api::blog.blog', {
        filters: { Title },
        limit: 1,        
      });
      console.log(existingBlog,'sss', Body);
      if (existingBlog.length > 0) {
        ctx.body = 'Blog with this title already exists';
      } else {
        // If not, create a new blog
        console.log('ggg');
        const newBlog = await strapi.entityService.create('api::blog.blog', {
          data: {
            Title,
            Description,
            Image,
            Status,
          },
        });
        

        ctx.body = {
          message: 'New blog created successfully',
          blog: newBlog,
        };
      }
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
};
