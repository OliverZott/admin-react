/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { } from "react";


export default function Paginator(props: { lastPage: number, page: number, pageChanged: (page: number) => void }) {

    const next = () => {
        if (props.page < props.lastPage) {
            props.pageChanged(props.page + 1)
        }
    }

    const previous = () => {
        if (props.page > 1) {
            props.pageChanged(props.page - 1)
        }
    }

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a href="#" className="page-link mx-auto" onClick={previous}>Previous</a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link mx-auto" onClick={next}>Next</a>
                </li>
            </ul>
        </nav>
    )

}