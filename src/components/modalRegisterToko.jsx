import React from "react";
import FormRegisterToko from "../components/formRegisterToko";

class ModalRegisterToko extends React.Component {
    render() {
        return (
            <div
                class="modal fade"
                id="ModalRegisterToko"
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
                                Daftar Toko
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
                            <FormRegisterToko />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ModalRegisterToko;
