const createPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-post').value.trim();
  const content = document.querySelector('#content-post').value.trim();

  if (title && content) {
    const response = await fetch('/dashboard/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    // TODO: send to newly created post
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create post.');
    }
  }
};

document
  .querySelector('.post-form')
  .addEventListener('submit', createPostFormHandler);