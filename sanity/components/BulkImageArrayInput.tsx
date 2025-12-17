import { useCallback } from 'react';
import {
  ArrayOfObjectsInputProps,
  ArrayOfObjectsInput,
  insert,
  setIfMissing,
} from 'sanity';
import { randomKey } from '@sanity/util/content';
import { useClient } from 'sanity';

type FileUpload = {
  file: File;
};

export function BulkImageArrayInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: '2024-01-01' });
  const { onChange, schemaType } = props;

  // Get the image member type from the array schema
  const imageMemberType = schemaType.of.find(
    (member) => member.type?.name === 'image' || member.name === 'galleryImage'
  );

  const handleUpload = useCallback(
    async (files: FileUpload[]) => {
      if (!imageMemberType) {
        console.error('No image member type found in array schema');
        return;
      }

      // Ensure the array exists
      onChange(setIfMissing([]));

      // Upload each file and add to array
      const uploadPromises = files.map(async ({ file }) => {
        try {
          // Upload the image to Sanity
          const asset = await client.assets.upload('image', file, {
            filename: file.name,
          });

          // Create the array item with the uploaded image
          const newItem = {
            _type: imageMemberType.name || 'image',
            _key: randomKey(12),
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
            // Initialize custom fields as empty
            alt: '',
            title: file.name.replace(/\.[^/.]+$/, ''), // Use filename without extension as default title
            description: '',
            category: '',
          };

          // Insert at the end of the array
          onChange(insert([newItem], 'after', [-1]));

          return newItem;
        } catch (error) {
          console.error('Failed to upload image:', file.name, error);
          return null;
        }
      });

      await Promise.all(uploadPromises);
    },
    [client, onChange, imageMemberType]
  );

  return (
    <div
      onDrop={(e) => {
        // Check if multiple files are being dropped
        if (e.dataTransfer?.files?.length > 1) {
          e.preventDefault();
          e.stopPropagation();

          const files: FileUpload[] = Array.from(e.dataTransfer.files)
            .filter((file) => file.type.startsWith('image/'))
            .map((file) => ({ file }));

          if (files.length > 0) {
            handleUpload(files);
          }
        }
      }}
      onDragOver={(e) => {
        if (e.dataTransfer?.types?.includes('Files')) {
          e.preventDefault();
        }
      }}
    >
      <ArrayOfObjectsInput {...props} />
    </div>
  );
}

export default BulkImageArrayInput;
