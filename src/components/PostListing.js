import React from "react";
import { Link } from "react-router-dom";

const PostListing = ({ content }) => {

  const date = new Date(content.timestamp);
  const date_formatted = date.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div>
        {content && <div>
            <div class="max-w-md w-full py-4 px-8 bg-white shadow-lg rounded-lg my-20">
                <h2 class="text-gray-800 text-2xl font-bold break-words">{content.title}</h2>
                <div class="flex mt-4 items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-8 rounded focus:outline-none focus:shadow-outline" type="submit">
                        <Link
                          to={{
                            pathname: `/posts/${content._id}`,
                            state: {
                              id: content._id,
                            },
                          }}
                        >
                          View Post
                        </Link>
                    </button>
                    <a href="#" class="text-base font-medium text-blue-700">{date_formatted}</a>
                </div>
            </div>
        </div>}
    </div>
  );
};

export default PostListing;