import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { requestPermissionsAsync } from 'expo-barcode-scanner';
import { askAsync, CAMERA } from 'expo-permissions';
import { Linking } from 'react-native';

// eslint-disable-next-line @typescript-eslint/ban-types
type WithChildren<T = {}> = T & { children?: React.ReactNode };

type StatusType = 'granted' | 'undetermined' | 'denied';

type CameraPermissionContext = {
  getCurrentStatus(): void;
  openSettingsIOS(): void;
  openSettingsAndroid(): void;
  hasPermission: StatusType;
};

const CameraPermissionContext = createContext<CameraPermissionContext | null>(
  null,
);

const CameraPermissionProvider = ({ children }: WithChildren): JSX.Element => {
  const [hasPermission, setHasPermission] = useState<StatusType>(
    'undetermined',
  );

  const getCurrentStatus = useCallback(async () => {
    const { status } = await requestPermissionsAsync();
    setHasPermission(status);
  }, []);

  const openSettingsIOS = useCallback(() => {
    Linking.openSettings();
  }, []);

  const openSettingsAndroid = useCallback(async () => {
    await askAsync(CAMERA);
  }, []);

  const contextValues = useMemo(
    () => ({
      getCurrentStatus,
      openSettingsIOS,
      openSettingsAndroid,
      hasPermission,
    }),
    [getCurrentStatus, openSettingsIOS, openSettingsAndroid, hasPermission],
  );

  return (
    <CameraPermissionContext.Provider value={contextValues}>
      {children}
    </CameraPermissionContext.Provider>
  );
};

const useCameraPermission = (): CameraPermissionContext => {
  const context = useContext(CameraPermissionContext);

  if (!context) {
    throw new Error(
      'useCameraPermission must be used within a CameraPermissionProvider',
    );
  }

  return context;
};

export { CameraPermissionProvider, useCameraPermission };
