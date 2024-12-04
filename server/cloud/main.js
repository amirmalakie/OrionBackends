Parse.Cloud.define('hello', async (request) => {
    return 'سلام از cloud function!';
  });
  
  Parse.Cloud.beforeSave('Post', async (request) => {
    const post = request.object;
    
    // اعتبارسنجی محتوا
    if (!post.get('title') || post.get('title').length < 3) {
      throw new Error('عنوان پست باید حداقل 3 کاراکتر باشد');
    }
  });
  
  Parse.Cloud.afterSave('Comment', async (request) => {
    const comment = request.object;
    
    // افزایش تعداد کامنت‌ها در پست مرتبط
    const post = comment.get('post');
    if (post) {
      await post.increment('commentCount');
      await post.save(null, { useMasterKey: true });
    }
  });