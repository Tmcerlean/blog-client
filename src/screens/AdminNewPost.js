import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

const AdminNewPost = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [createPostErr, setCreatePostErr] = useState(false);

    let history = useHistory();
    
    const isTitleValid = title.length >= 5;
    const isBodyValid = body.length >= 20;
    const isPostValid = isTitleValid && isBodyValid;

    useEffect(() => {
        document.title = 'Admin Page';
    }, []);

    const createNewPost = async (e, title, body) => {

        e.preventDefault();

        const data = {title, body}
        const formData = JSON.stringify(data);

        try {
          const req = await fetch(
            "https://shrouded-retreat-49775.herokuapp.com/api/posts",
            {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          if (req.status !== 200) {
            setCreatePostErr(true);
            return;
          }
          history.push("/");
        } catch (err) {
            setCreatePostErr(true);
        }
    }

    return (
        <div className="w-screen mx-auto flex flex-wrap py-6">
            <div className="w-full mx-auto md:w-2/3 flex flex-col items-center px-3">
                <form className="w-full max-w-lg" onSubmit={(e) => createNewPost(e, title, body)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Title
                            </label>
                            <input 
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                type="text" 
                                name="title"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Body
                            </label>
                            <textarea 
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                type="text" 
                                name="body"
                                placeholder="Content"
                                value={body}
                                onChange={(e) => setBody(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isPostValid ? "cursor-pointer" : "bg-opacity-50 cursor-default"}`} type="submit">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminNewPost;