import { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Comment from "../components/Comment";

const AdminEditPost = () => {

    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [getPostsErr, setGetPostsErr] = useState(false);
    const [getCommentsErr, setGetCommentsErr] = useState(false);
    const [updatePostErr, setUpdatePostErr] = useState(false);
    const [deletePostErr, setDeletePostErr] = useState(false);
    const [deleteCommentErr, setDeleteCommentErr] = useState(false);
    const [deleteAllCommentsErr, setDeleteAllCommentsErr] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    let history = useHistory();
    let { id } = useParams();

    const isTitleValid = title.length >= 5;
    const isBodyValid = (body.length >= 20);
    const isPostValid = isTitleValid && isBodyValid;

    useEffect(() => {
        document.title = 'Post';
    }, []);

    useEffect(() => {
        if (post?.title) {
            setTitle(post.title)
        }
        if (post?.body) {
            setBody(post.body)
        }
    }, [post]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const req = await fetch(
                    `https://shrouded-retreat-49775.herokuapp.com/api/posts/${id}`
                );
                console.log(req)
                if (req.status !== 200) {
                    return;
                }
                const reqJson = await req.json();
                setPost(reqJson.post);
            } catch (err) {
                setGetPostsErr(true);
            }
        };
        getPosts();
    
        const getComments = async () => {
            try {
                const req = await fetch(
                    `https://shrouded-retreat-49775.herokuapp.com/api/posts/${id}/comments`
                );
                if (req.status !== 200) {
                    return;
                }
                const reqJson = await req.json();
                setComments(reqJson.comments);
            } catch (err) {
                setGetCommentsErr(true);
            }
        };
        getComments();
        setSuccessMessage(false);
    }, []);

    const updatePost = async (e, title, body) => {

        e.preventDefault();

        const data = {title, body}
        const formData = JSON.stringify(data);
        
        try {
            const req = await fetch(
                `https://shrouded-retreat-49775.herokuapp.com/api/posts/${id}`,
                {
                    method: "PUT",
                    body: formData,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (req.status !== 200) {
                return;
            }
            setSuccessMessage(true);
            history.push("/");
        } catch (err) {
            setUpdatePostErr(true);
        }
    };

    const deletePost = async () => {
        try {
            const req = await fetch(
                `https://shrouded-retreat-49775.herokuapp.com/api/posts/${id}`,
            {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );
            if (req.status !== 200) {
                return;
            }
            await deleteAllComments();
            history.push("/");
        } catch (err) {
            setDeletePostErr(true);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const req = await fetch(
                `https://shrouded-retreat-49775.herokuapp.com/api/posts/${id}/comments/${commentId}`,
                {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (req.status !== 200) {
                return;
            }
            const newComments = comments.filter(
                (comment) => comment._id !== commentId
            );
            setComments(newComments);
        } catch (err) {
            setDeleteCommentErr(true);
        }
    };
    
    const deleteAllComments = async () => {
        try {
            const req = await fetch(
                `https://shrouded-retreat-49775.herokuapp.com/api/posts/${id}/comments`,
                {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (req.status !== 200) {
                return;
            }
            const newComments = {};
            setComments(newComments);
        } catch (err) {
            setDeleteAllCommentsErr(true);
        }
    };

    return (
        <div className="w-screen mx-auto flex flex-wrap py-6">
            <div className="w-full mx-auto md:w-2/3 flex flex-col items-center px-3">
                <form className="flex flex-col my-4 w-full" onSubmit={(e) => updatePost(e, title, body)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Title
                            </label>
                            <input 
                                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
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
                                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                type="text" 
                                placeholder="Content"
                                value={body}
                                onChange={(e) => setBody(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline ${isPostValid ? "cursor-pointer" : "bg-opacity-50 cursor-default"}`} 
                            type="submit"
                        >
                            Update
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="button"
                            onClick={deletePost}
                        >
                            Delete
                        </button>
                    </div>
                </form>
                <div className="w-full">
                    {comments &&
                    comments.map((comment) => {
                        return <Comment key={comment._id} comment={comment} edit={true} deleteComment={deleteComment} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminEditPost;