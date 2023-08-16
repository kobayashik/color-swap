import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import { HiOutlineClipboardCheck } from 'react-icons/hi';

type Props = {
  label: string;
  value: string;
};

export const ColorField = ({ label, value }: Props) => {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const onCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      ref?.current?.select();
    } catch (err) {
      console.log('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <FormControl
      display="grid"
      gridTemplateColumns="0fr 2fr"
      gap="2"
      alignItems="center"
      isReadOnly
    >
      <FormLabel margin="1">{label}</FormLabel>

      <InputGroup>
        <Input ref={ref} placeholder="#32122" value={value} />
        <InputRightElement width="3rem">
          <Tooltip
            hasArrow
            borderRadius="4"
            isOpen={copied}
            isDisabled={!copied}
            label="Copied!"
            placement="top"
          >
            <Button h="1.75rem" size="sm" variant="link" onClick={onCopyClick}>
              <Icon
                as={HiOutlineClipboardCheck}
                boxSize={5}
                color={copied ? 'teal.400' : 'gray.500'}
                _hover={{ color: copied ? 'teal.400' : 'gray.400' }}
              />
            </Button>
          </Tooltip>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
