const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:5000/api';
export const DEFAULT_DEVICE_ID =
  process.env.EXPO_PUBLIC_DEVICE_ID || 'tinynest-firetv-livingroom';

async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    return {ok: res.ok, status: res.status, data};
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err.message || 'Network unavailable',
      data: null,
    };
  }
}

export const apiClient = {
  registerDevice: async (
    deviceId = DEFAULT_DEVICE_ID,
    name = 'Living Room Fire TV',
  ) => {
    return apiFetch('/devices/register', {
      method: 'POST',
      body: JSON.stringify({deviceId, name}),
    });
  },

  getDeviceState: async (deviceId = DEFAULT_DEVICE_ID) => {
    return apiFetch(`/devices/${deviceId}/state`);
  },

  verifyParentPin: async (deviceId = DEFAULT_DEVICE_ID, pin) => {
    return apiFetch(`/devices/${deviceId}/verify-pin`, {
      method: 'POST',
      body: JSON.stringify({pin}),
    });
  },

  completeTask: async taskId => {
    if (!taskId) {
      return {ok: false, status: 400};
    }
    return apiFetch(`/tasks/${taskId}/complete`, {
      method: 'POST',
    });
  },

  startLessonSession: async (
    deviceId = DEFAULT_DEVICE_ID,
    durationMinutes = 15,
  ) => {
    return apiFetch('/lessons/sessions', {
      method: 'POST',
      body: JSON.stringify({deviceId, durationMinutes}),
    });
  },

  completeLessonSession: async sessionId => {
    if (!sessionId) {
      return {ok: false, status: 400};
    }
    return apiFetch(`/lessons/sessions/${sessionId}/complete`, {
      method: 'POST',
    });
  },

  verifyLessonSession: async sessionId => {
    if (!sessionId) {
      return {ok: false, status: 400};
    }
    return apiFetch(`/lessons/sessions/${sessionId}/verify`, {
      method: 'POST',
    });
  },

  sendHeartbeat: async (deviceId = DEFAULT_DEVICE_ID) => {
    return apiFetch(`/devices/${deviceId}/heartbeat`, {
      method: 'POST',
    });
  },
};
