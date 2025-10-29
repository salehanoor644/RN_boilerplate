import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/core';
import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { SF } from '../../utills/dimensions';
import { Colors, Fonts } from '../../constents';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = Record<string, object | undefined>;

type NavbarProps = {
  title?: string;
  goBackHandler?: () => void;
   showMenu?: boolean;            // ✅ new
  onMenuPress?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ goBackHandler, title, showMenu, onMenuPress }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      height={52}
    >
      <Pressable
        onPress={showMenu ? onMenuPress : goBackHandler}
        p={8}
        borderRadius={100}
      >
        {showMenu ? (
          <Ionicons name="menu" size={24} color={Colors.iconColor} />
        ) : (
          <Ionicons name="chevron-back" size={28} color={Colors.iconColor} />
        )}
      </Pressable>


      {title && (
        <Box>
          <Text
            fontFamily={Fonts.semiBold}
            fontWeight={700}
            fontSize={16}
            lineHeight={27}
            color={Colors.black}
          >
            {title}
          </Text>
        </Box>
      )}

      {/* Empty box to keep title centered */}
      <Box width={40} />
    </Box>
  );
};

export default Navbar;
