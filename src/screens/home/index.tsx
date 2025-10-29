import { Box, Heading } from '@gluestack-ui/themed';
import React from 'react';
import Navbar from '../../components/navbar';
import { Colors } from '../../constents';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type props = {
  navigation: any,
}
const Home: React.FC<props> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const openDrawer = () => {
    navigation.getParent('RootDrawer')?.openDrawer()
  };
  
  return(
    <Box
      flex={1}
      bgColor={Colors.white}
      paddingTop={insets.top}
      paddingBottom={insets.bottom}>
      <Navbar title="Home" showMenu onMenuPress={openDrawer} />
      <Box>
        <Heading>Continue work on it</Heading>
      </Box>
    </Box>
  )
}
export default Home;