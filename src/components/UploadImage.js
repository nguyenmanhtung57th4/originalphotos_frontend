import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class UploadImage extends Component {
    render() {
        return (
            <div>
                <Link to='/uploadimage'>
                    TẢI ẢNH LÊN
                </Link>
            </div>
        )
    }
}
