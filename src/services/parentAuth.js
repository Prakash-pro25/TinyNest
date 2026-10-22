import {apiClient, DEFAULT_DEVICE_ID} from './apiClient';

export async function verifyParentPinWithBackend(
  pin,
  deviceId = DEFAULT_DEVICE_ID,
) {
  const res = await apiClient.verifyParentPin(deviceId, pin);
  if (res.ok && res.data?.verified) {
    return {
      success: true,
      verified: true,
      message: res.data.message || 'Parent verified',
    };
  }

  if (res.status === 429) {
    return {
      success: false,
      locked: true,
      message:
        res.data?.message || 'Too many failed attempts. Wait 30 seconds.',
    };
  }

  if (res.status === 401) {
    return {
      success: false,
      verified: false,
      message: res.data?.message || 'That PIN did not match. Try again.',
    };
  }

  // Network fallback: offline check if server unavailable
  if (!res.ok && res.status === 0) {
    return {
      success: pin === '2468',
      verified: pin === '2468',
      message: pin === '2468' ? 'Verified (Offline mode)' : 'PIN incorrect',
    };
  }

  return {
    success: false,
    verified: false,
    message: res.data?.message || 'Verification error',
  };
}
