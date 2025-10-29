import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  VStack,
  Heading,
  Pressable,
} from '@gluestack-ui/themed';
import { SH } from '../../utills/dimensions';
import CustomButton from '../common/customButton';
import { setAppLanguage } from '../../redux/slices/auth';
import Languages from '../../translation/i18n';
import { Colors } from '../../constents';

interface ListItem {
  id: string;
  name: string;
}

interface SelectModalProps {
  isVisible: boolean;
  listData: ListItem[];
  title: string;
  dataType: string;
  selected: string | string[];
  setSelected: (value: string | string[]) => void;
  setModal: React.Dispatch<React.SetStateAction<string>>;
}

const SelectModal: React.FC<SelectModalProps> = ({
  isVisible,
  listData,
  title,
  dataType,
  selected,
  setSelected,
  setModal,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const localLang = useSelector((store: any) => store.auth.currentLanguage);
  const [clickedValue, setClickedValue] = useState<string | string[]>(selected);

  useEffect(() => {
    setClickedValue(selected);
  }, [selected]);

  const onOptionClick = (item: ListItem) => {
    if (dataType === 'languages') {
      setClickedValue(item.id);
    }
  };

  const okButtonClick = () => {
    if (clickedValue) {
      setSelected(clickedValue);
      if (dataType === 'languages') {
        dispatch(setAppLanguage(clickedValue as string));
        Languages(clickedValue as string);
      }
      setModal('');
    }
  };

  const cancelButtonClick = () => {
    setModal('');
  };

  return (
    <Modal isOpen={isVisible} onClose={cancelButtonClick}>
      <ModalBackdrop />
      <ModalContent borderRadius={20} py="$5" maxWidth={375}>
        <ModalBody
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SH(10),
          }}
        >
          <Heading fontSize={18} textAlign="center" mb="$3" color={Colors.black}>
            {title}
          </Heading>

          {/* List of options */}
          <FlatList
            data={listData}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <Pressable
                style={styles.optionContainer}
                onPress={() => onOptionClick(item)}
              >
                <Heading
                  fontSize={16}
                  color={
                    clickedValue === item.id
                      ? Colors.btnPrimaryColor
                      : Colors.black
                  }
                  fontFamily={
                    localLang === 'ar'
                      ? 'GEDinarOne-Medium'
                      : 'Montserrat-Medium'
                  }
                >
                  {item.name}
                </Heading>
              </Pressable>
            )}
          />
        </ModalBody>

        <ModalFooter justifyContent="center">
          <VStack space="md" w="80%">
            <CustomButton
              label={t('SELECT')}
              textTransform="uppercase"
              bgColor={Colors.btnPrimaryColor}
              textColor={Colors.white}
              onPress={okButtonClick}
            />
            <CustomButton
              label={t('CANCEL')}
              textTransform="uppercase"
              bgColor={Colors.transparent}
              textColor={Colors.black}
              onPress={cancelButtonClick}
            />
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 14,
    alignItems: 'center',
  },
});

export default SelectModal;
