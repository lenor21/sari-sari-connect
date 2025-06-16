import { Pencil, Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { supabase, supabaseUrl } from '@/lib/supaBaseProfileClient';
import Swal from 'sweetalert2';
import { useUpdateMutation } from '@/features/auth/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';

const SupabaseProfile = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [update] = useUpdateMutation();

  const dispatch = useDispatch();

  const bucketName = 'sari-sari-connect';
  const folderName = 'profiles';

  useEffect(() => {
    if (profile) {
      handleProfileUpload(profile);
    }
  }, [profile]);

  const handleProfileUpload = async (img: File) => {
    setIsUploading(true);

    const fileName = `${Date.now()}-${img.name.replace(/\s+/g, '_')}`; // Replace spaces for URL safety
    const filePathBucket = `${folderName}/${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePathBucket, img, {
          cacheControl: '3600', // Cache for 1 hour
          upsert: false, // Don't replace if file exists
        });

      if (error) {
        throw error;
      }

      // Construct the public URL
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${data.path}`;

      const res = await update({
        profileImage: publicUrl,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      // console.log('File uploaded successfully!', publicUrl);

      Swal.fire({
        color: '#0a0a0a',
        position: 'center',
        icon: 'success',
        title: `Profile image updated!`,
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (err: any) {
      Swal.fire({
        color: '#0a0a0a',
        position: 'center',
        icon: 'error',
        title: `${err.message}`,
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Button
        className='absolute bottom-0 right-0'
        onClick={() => {
          if (fileRef.current) {
            fileRef.current.click();
          }
        }}>
        {!isUploading ? <Pencil /> : <Loader2Icon className='animate-spin' />}
      </Button>
      <input
        ref={fileRef}
        type='file'
        hidden
        accept='image/*'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            setProfile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

export default SupabaseProfile;
