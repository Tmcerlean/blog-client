import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import AdminPostListing from "../components/AdminPostListing";

const Admin = () => {

    const [posts, setPosts] = useState();

    useEffect(() => {
        document.title = 'Admin Homepage';
    }, []);

    useEffect(() => {
    const getPosts = async () => {
        try {
            const req = await fetch(
                "https://shrouded-retreat-49775.herokuapp.com/api/posts",
            );
            if (req.status !== 200) {
                return;
            }
            const reqJson = await req.json();
            setPosts(reqJson.posts);
        } catch (err) {}
    };
    getPosts();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center justify-items-center w-screen">
            {!posts ? (
                <Skeleton count={8} width={300} height={300} className="m-5" />
            ) : (
                posts.map((post) => <AdminPostListing key={post._id} content={post} />)
            )}
        </div>
    )
}

export default Admin;