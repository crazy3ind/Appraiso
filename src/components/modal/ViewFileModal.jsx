import "../modal/modal.css"
import {Tooltip} from "primereact/tooltip"
import React from "react"
import {IoMdDownload} from "react-icons/io"
import {RiDeleteBinLine} from "react-icons/ri"

const ViewFileModal = ({
  isOpen,
  onClose,
  accessType,
  viewFiles,
  type,
  deleteFile,
}) => {
  console.log("viewfiles", viewFiles)
  return (
    <div style={{display: isOpen ? "block" : "none"}}>
      <div className="modal_overlay">
        <div className="attch-modal-upload">
          <span className="text-blue-500 ml-82" onClick={onClose}>
            &times;
          </span>
          <div className="attch-modal-body">
            <div className="attachment-header">
              <div className="attch-tittle">Attachment(s)</div>
              <div
                className="attch-tittle-all"
                /* onClick={(e) => {
                      downloadAll(type)
                    }} */
              >
                Download All
              </div>
            </div>
            <hr className="m-0 mb-2 mt-1" />
            {/* {accessType === "reviewer" && ( */}
            <>
              {viewFiles.length !== 0 ? (
                <>
                  {viewFiles.map((item, i) => (
                    <div key={i}>
                      <div className="attachment-row">
                        <Tooltip target=".attach-toltip" />
                        <div
                          className="col-8 attch-file-name attach-toltip"
                          data-pr-tooltip={item.name}
                          data-pr-position="top"
                        >
                          {item.name}
                        </div>
                        {item.DownloadURL && (
                          <div className="col-2 ">
                            <IoMdDownload
                              /* onClick={(e) => {
                                onDowloadFile(item.DownloadURL)
                              }} */
                              data-pr-tooltip="Download"
                              data-pr-position="left"
                              className="attch-icon attach-toltip"
                            />
                          </div>
                        )}
                        {type === "emp" && (
                          <div className="col-2">
                            <RiDeleteBinLine
                              onClick={(e) => {
                                deleteFile(item, type)
                              }}
                              data-pr-tooltip="Delete"
                              data-pr-position="left"
                              className="attch-icon attach-toltip"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <span className="data-not">No attachments found.</span>
              )}
            </>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewFileModal
