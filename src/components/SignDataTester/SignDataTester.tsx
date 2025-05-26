import './style.scss';
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { beginCell, Cell } from '@ton/ton';
import { useState } from 'react';
import ReactJson from 'react-json-view';
import { TonProofDemoApi } from '../../TonProofDemoApi';

// Component to test SignData functionality
export function SignDataTester() {
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  const [signDataRequest, setSignDataRequest] = useState<any>(null);
  const [signDataResponse, setSignDataResponse] = useState<any>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  // Handle text signing
  const handleTextSign = async () => {
    // Clear previous state
    setSignDataRequest(null);
    setSignDataResponse(null);
    setVerificationResult(null);
    
    try {
      const requestPayload = {
        type: 'text' as const,
        text: 'I confirm this test signature request.',
      };
      
      setSignDataRequest(requestPayload);
      console.log('📤 Sign Data Request (Text):', requestPayload);
      
      const result = await tonConnectUi.signData(requestPayload);
      
      setSignDataResponse(result);
      console.log('📥 Sign Data Response (Text):', result);
      
      // Verify the signature
      if (wallet) {
        const verification = await TonProofDemoApi.checkSignData(result, wallet.account);
        setVerificationResult(verification);
        console.log('✅ Verification Result (Text):', verification);
      }
    } catch (e) {
      console.error('Error signing text:', e);
      if (e instanceof Error) {
        setSignDataResponse({ error: e.message });
      } else {
        setSignDataResponse({ error: 'Unknown error' });
      }
    }
  };

  // Handle binary signing
  const handleBinarySign = async () => {
    // Clear previous state
    setSignDataRequest(null);
    setSignDataResponse(null);
    setVerificationResult(null);
    
    try {
      // Example binary data (random bytes)
      const binaryData = Buffer.from('I confirm this test signature request.', 'ascii');
      const requestPayload = {
        type: 'binary' as const,
        bytes: binaryData.toString('base64'),
      };

      setSignDataRequest(requestPayload);
      console.log('📤 Sign Data Request (Binary):', requestPayload);
      
      const result = await tonConnectUi.signData(requestPayload);
      
      setSignDataResponse(result);
      console.log('📥 Sign Data Response (Binary):', result);
      
      // Verify the signature
      if (wallet) {
        const verification = await TonProofDemoApi.checkSignData(result, wallet.account);
        setVerificationResult(verification);
        console.log('✅ Verification Result (Binary):', verification);
      }
    } catch (e) {
      console.error('Error signing binary:', e);
      if (e instanceof Error) {
        setSignDataResponse({ error: e.message });
      } else {
        setSignDataResponse({ error: 'Unknown error' });
      }
    }
  };

  // Handle cell signing
  const handleCellSign = async () => {
    // Clear previous state
    setSignDataRequest(null);
    setSignDataResponse(null);
    setVerificationResult(null);
    
    try {
      // Create a simple cell with a message
      const text = "Test message in cell";
      const cell = beginCell()
        .storeUint(text.length, 7) // length
        .storeStringTail(text)
        .endCell();

      const requestPayload = {
        type: 'cell' as const,
        schema: 'message#_ len:uint7 {len <= 127} text:(bits len * 8) = Message;',
        cell: cell.toBoc().toString('base64'),
      };
      
      setSignDataRequest(requestPayload);
      console.log('📤 Sign Data Request (Cell):', requestPayload);
      
      const result = await tonConnectUi.signData(requestPayload);
      
      setSignDataResponse(result);
      console.log('📥 Sign Data Response (Cell):', result);
      
      // Verify the signature
      if (wallet) {
        const verification = await TonProofDemoApi.checkSignData(result, wallet.account);
        setVerificationResult(verification);
        console.log('✅ Verification Result (Cell):', verification);
      }
    } catch (e) {
      console.error('Error signing cell:', e);
      if (e instanceof Error) {
        setSignDataResponse({ error: e.message });
      } else {
        setSignDataResponse({ error: 'Unknown error' });
      }
    }
  };

  return (
    <div className="sign-data-tester">
      <h3>Sign Data Test & Verification</h3>
      
      <div className="sign-data-tester__info">
        Test different types of data signing: text, binary, and cell formats with signature verification
      </div>
      
      {wallet ? (
        <div className="sign-data-tester__buttons">
          <button onClick={handleTextSign}>
            Sign Text
          </button>
          <button onClick={handleBinarySign}>
            Sign Binary
          </button>
          <button onClick={handleCellSign}>
            Sign Cell
          </button>
        </div>
      ) : (
        <div className="sign-data-tester__error">
          Connect wallet to test signing
        </div>
      )}

      {signDataRequest && (
        <div className="sign-data-tester__debug">
          <h4>📤 Sign Data Request</h4>
          <ReactJson src={signDataRequest} name="request" theme="ocean" collapsed={false} />
        </div>
      )}

      {signDataResponse && (
        <div className="sign-data-tester__debug">
          <h4>📥 Sign Data Response</h4>
          <ReactJson src={signDataResponse} name="response" theme="ocean" collapsed={false} />
        </div>
      )}

      {verificationResult && (
        <div className="sign-data-tester__debug">
          <h4>✅ Verification Result</h4>
          <ReactJson src={verificationResult} name="verification" theme="ocean" collapsed={false} />
        </div>
      )}
    </div>
  );
} 
