import React from "react";
import FormSignup from "../components/formSignup";

class ModalSignup extends React.Component {
    render() {
        return (
            <div
                class="modal fade"
                id="ModalSignup"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5
                                class="modal-title align-content-center"
                                id="exampleModalLongTitle"
                            >
                                Daftar
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <FormSignup />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ModalSignup;
