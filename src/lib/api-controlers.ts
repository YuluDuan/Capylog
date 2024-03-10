  /**
 * create a new user to the database.
 *
 * @param {User} newUser - The new user data to save.
 * @returns {Promise<any>} The saved user data.
 * @throws Will throw an error if saving fails.
 */
export async function createUser(newUser: {
    user_id: string, 
    email: string, 
    firstName: string, 
    lastName: string,
  }): Promise<any> {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify({
        user_id: newUser.user_id, 
        email: newUser.email, 
        firstName: newUser.firstName, 
        lastName: newUser.lastName,
      }),
    });

    if (response.ok){
        console.log("response ok", newUser);
    }

  } catch (error) {
      console.log("Oh No error!", error);
  }
};


/**
 * Reads all posts from the database.
 *
 * @returns {Promise<[]>} The post data.
 * @throws Will throw an error if fetching fails.
 */
  export async function readPostsFromDatabase(userId: string): Promise<[]> {
    try {
      const response = await fetch(`/api/posts?userId=${encodeURIComponent(userId)}`);
      const data = await response.json();
      
      if (response.status !== 200) {
        console.log(data)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
 * Reads the current post from the database.
 *
 * @returns {Promise<>} The post data.
 * @throws Will throw an error if fetching fails.
 */
  export async function readPostFromDatabase(userId: string) {
    try {
      const response = await fetch(`/api/posts/current?userId=${encodeURIComponent(userId)}`);
      const data = await response.json();
      
      if (response.status !== 200) {
        console.log(data)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
 * Save a new post to the database.
 *
 * @param {PostType} newPost - The post data to save.
 * @returns {Promise<any>} The saved post data.
 * @throws Will throw an error if saving fails.
 */
export async function savePostToDatabase (newPost: {
  id: string, 
  original_text: string, 
  revised_text: string, 
  userId: string
}): Promise<any> {
  try {
    const response = await fetch("/api/posts/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
      id: newPost.id, 
      original_text: newPost.original_text, 
      revised_text: newPost.revised_text, 
      userId: newPost.userId
    }),
  });

  if (response.ok){
      console.log("response ok", newPost);
  }

} catch (error) {
    console.log("Oh No error!", error);
}
};