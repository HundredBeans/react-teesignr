import React from "react";

class BackToTop extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-right">
                    <button type="button" class="btn btn-dark">
                        <i class="fa fa-fw fa-angle-right"></i>
                    </button>
                </div>
            </div>
        );
    }
}
