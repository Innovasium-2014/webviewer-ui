import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignatureRowContent from 'components/SignatureStylePopup/SignatureRowContent';
import SignatureAddBtn from 'components/SignatureStylePopup/SignatureAddBtn';
import ToolsDropdown from 'components/ToolsDropdown';
import selectors from 'selectors';
import actions from 'actions';
import core from 'core';

import './SelectedSignatureRow.scss';

const SelectedSignatureRow = () => {
  const [activeToolName, isToolStyleOpen, selectedSignature, savedSignatures] = useSelector(
    state => [
      selectors.getActiveToolName(state),
      selectors.isElementOpen(state, 'toolStylePopup'),
      selectors.getSelectedSignature(state),
      selectors.getSavedSignatures(state),
    ],
  );
  const dispatch = useDispatch();

  const signatureTool = core.getTool('AnnotationCreateSignature');
  return (
    <div
      className="selected-signature-row"
    >
      {selectedSignature ?
        <SignatureRowContent
          imgSrc={selectedSignature.imgSrc}
          onClick={() => {
            signatureTool.setSignature(selectedSignature.annotation);
            core.setToolMode('AnnotationCreateSignature');
            if (signatureTool.hasLocation()) {
              signatureTool.addSignature();
            } else {
              signatureTool.showPreview();
            }
          }}
          isActive={activeToolName === 'AnnotationCreateSignature'}
        /> :
        <SignatureAddBtn/>}
      <ToolsDropdown
        onClick={() => savedSignatures.length > 0 && dispatch(actions.toggleElement('toolStylePopup'))}
        isActive={isToolStyleOpen}
        isDisabled={savedSignatures.length === 0}
      />
    </div>
  );
};

export default SelectedSignatureRow;