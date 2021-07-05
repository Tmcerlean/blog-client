import React, { useEffect, useState } from "react";
import {
    useLocation
  } from "react-router-dom";
import Comment from "../components/Comment";

const Post = () => {

    const location = useLocation()
    const { id } = location.state

    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const [post, setPost] = useState('');
    const [currentComments, setCurrentComments] = useState(null);
    const [createCommentErr, setCreateCommentErr] = useState(false);
    
    const isUserValid = user.length > 0;
    const isCommentTextValid = (comment.length > 0);
    const isCommentValid = isUserValid && isCommentTextValid;

    const date = new Date(post.date);
    const date_formatted = date.toLocaleDateString("en-gb", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    useEffect(() => {
        const getPost = async () => {
            try {
                const req = await fetch(
                    `https://shrouded-retreat-49775.herokuapp.com/api/posts/${id}`,
                );
                if (req.status !== 200) {
                    return;
                }
                const resJson = await req.json();
                const currentPost = resJson.post;

                const commentsRes = await fetch(
                    `https://shrouded-retreat-49775.herokuapp.com/api/posts/${id}/comments`
                );

                const commentsResJson = await commentsRes.json();
                let comments = commentsResJson.comments;
                if (!comments) {
                    comments = null;
                }
                setPost(currentPost);
                setCurrentComments(comments);
            } catch (err) {}
        };
        getPost();
    }, [id]);

    const createNewComment = async (e, user, comment) => {

        e.preventDefault();

        const data = {user, body: comment}
        console.log(data)

        if (currentComments) {
            setCurrentComments([...currentComments, data]);
        } else {
            setCurrentComments([data])
        }

        const formData = JSON.stringify(data);
        console.log(formData)

        console.log(id)

        try {
            const req = await fetch(
                `https://shrouded-retreat-49775.herokuapp.com/api/posts/${id}/comments`,
                {
                    method: "post",
                    body: formData,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (req.status !== 200) {
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-screen mx-auto flex flex-wrap py-6">
            <section className="w-full mx-auto md:w-2/3 flex flex-col items-center px-3">
                <article className="flex flex-col my-4 w-full">
                    <div className="flex flex-col items-center justify-start">
                        <h1 className="text-gray-800 text-2xl font-bold pb-3 text-center break-all">{post.title}</h1>
                        <p className="break-all">{post.body}</p>
                    </div>
                    <h2 className="text-gray-800 text-md font-bold pb-3 mt-4 text-center">Comments:</h2>
                </article>
                <div className="flex flex-col w-full">
                    <div className="">
                            {currentComments &&
                            currentComments.map((comment) => {
                                return <Comment key={comment._id} comment={comment} />;
                            })}
                    </div>
                    <h2 className="text-gray-800 text-md font-bold pb-3 mt-4 text-center">Add Comment:</h2>
                    <div className="mt-2">
                        <form className="w-full" onSubmit={(e) => createNewComment(e, user, comment)}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Name
                                    </label>
                                    <input 
                                        className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                        type="text" 
                                        name="user"
                                        placeholder="Name"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)} 
                                    />
                                </div>
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                        Comment
                                    </label>
                                    <textarea 
                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                        type="text" 
                                        name="body"
                                        placeholder="Comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isCommentValid ? "cursor-pointer" : "bg-opacity-50 cursor-default"}`} type="submit">
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Post;