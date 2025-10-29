import { Box } from '@gluestack-ui/themed';
import React from 'react';
import Navbar from '../../components/navbar';
import { Colors } from '../../constents';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type props = {
  navigation: any,
}
const Profile: React.FC<props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  
  return(
    <Box
      flex={1}
      bgColor={Colors.white}
      paddingTop={insets.top}
      paddingBottom={insets.bottom}>
      <Navbar title='Profile' goBackHandler={() => navigation.goBack()}/>
    </Box>
  )
}
export default Profile;