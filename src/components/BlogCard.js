import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
    return (
        
            <div className="blog-card">
                <div className="card-image">
                    <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
                </div>
                <div className="blog-content">
                    <p className="date">1 Dec, 2022</p>
                    <h5 className="title">A beautiful Sunday morning renaissance</h5>
                    <p className="desc">
                        ullamco non eu aliqua ad lorem occaecat labore minim anim irure consequat sed nulla eiusmod in dolor est nostrud.
                    </p>
                    <Link to="/blog/:id" className="button">Read More</Link>
                </div>
            </div>
        
    );
};

export default BlogCard;
