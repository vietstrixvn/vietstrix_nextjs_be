'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Check, Pencil, X } from 'lucide-react';
import { RefreshButton } from '../button/refresh.button';
import { WebsiteList } from '@/lib';
import { Skeleton } from '../ui/skeleton';
import { Heading } from '../design/Heading';
import {
  Facebook,
  Instagram,
  Github,
  Linkedin,
  Globe,
  Dribbble,
} from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';
import { WebsiteFormSchema } from '@/utils';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateWebsiteData } from '@/hooks';
import { UpdateWebsite } from '@/types';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

const WebsiteCard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { website, isLoading, isError } = WebsiteList(refreshKey);
  const [newEmail, setNewEmail] = useState('');
  const { mutate: updateSeo } = useUpdateWebsiteData();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof WebsiteFormSchema>>({
    resolver: zodResolver(WebsiteFormSchema),
    defaultValues: {
      phone_number: '',
      messenger: '',
      mail: [],
      fb: '',
      ig: '',
      github: '',
      linkedin: '',
      pinterest: '',
      upwork: '',
      dribbble: '',
    },
  });

  useEffect(() => {
    if (website) {
      form.reset({
        phone_number: website.phone_number || '',
        messenger: website.messenger || '',
        mail: website.mail || [],
        fb: website.fb || '',
        ig: website.ig || '',
        github: website.github || '',
        linkedin: website.linkedin || '',
        pinterest: website.pinterest || '',
        upwork: website.upwork || '',
        dribbble: website.dribbble || '',
      });
    }
  }, [website, form]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const getHref = (val: unknown) => {
    if (Array.isArray(val)) return val[0] || '#'; // lấy cái đầu hoặc '#'
    if (val instanceof Date) return val.toISOString(); // chuyển Date thành string ISO
    if (typeof val === 'string') return val;
    return '#'; // fallback
  };

  const socials = [
    {
      label: 'Facebook',
      icon: <Facebook size={18} />,
      link: website.fb,
      name: 'fb',
    },
    {
      label: 'Instagram',
      icon: <Instagram size={18} />,
      link: website.ig,
      name: 'ig',
    },
    {
      label: 'GitHub',
      icon: <Github size={18} />,
      link: website.github,
      name: 'github',
    },
    {
      label: 'LinkedIn',
      icon: <Linkedin size={18} />,
      link: website.linkedin,
      name: 'linkedin',
    },
    {
      label: 'UpWork',
      icon: <Globe size={18} />,
      link: website.upwork,
      name: 'upwork',
    },
    {
      label: 'Pinterest',
      icon: <FaPinterest size={18} />,
      link: website.pinterest,
      name: 'pinterest',
    },
    {
      label: 'Dribbble',
      icon: <Dribbble size={18} />,
      link: website.dribbble,
      name: 'dribbble',
    },
  ];

  const handleSave = form.handleSubmit((values) => {
    const payload: UpdateWebsite = {
      ...values,
      mail: values.mail.map((k) => k.trim()),
    };
    updateSeo(
      { updateweb: payload },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  });

  const removeEmail = (keyword: string) => {
    const current = form.getValues('mail') || [];
    form.setValue(
      'mail',
      current.filter((k) => k !== keyword)
    );
  };

  const addEmail = () => {
    const trimmed = newEmail.trim();
    if (!trimmed) return;
    const current = form.getValues('mail') || [];
    if (!current.includes(trimmed)) {
      form.setValue('mail', [...current, trimmed]);
    }
    setNewEmail('');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold text-main uppercase">
              Webiste Information
            </CardTitle>
            {!isEditing ? (
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-main hover:bg-main-700"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4 text-white" />
              </Button>
            ) : (
              <>
                <Button
                  size="icon"
                  className="h-8 w-8 rounded-full bg-green-600 hover:bg-green-700"
                  onClick={handleSave}
                >
                  <Check className="h-4 w-4 text-white" />
                </Button>
                <Button
                  size="icon"
                  className="h-8 w-8 rounded-full bg-red-600 hover:bg-red-700"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </>
            )}
          </div>
          <RefreshButton onClick={handleRefresh} />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : isError || !website ? (
          <p className="text-red-500 text-sm">Failed to load website data.</p>
        ) : (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Heading name="Info" />
              <div>
                <label className="text-sm font-bold text-main">
                  Phone Number
                </label>
                {isEditing ? (
                  <Input {...form.register('phone_number')} />
                ) : (
                  <p className="text-sm text-gray-900 mt-1">
                    {website.phone_number}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-bold text-main">Messenger</label>
                {isEditing ? (
                  <Input {...form.register('messenger')} />
                ) : (
                  <a
                    href={website.messenger}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-700 text-sm mt-1 hover:text-main-400"
                  >
                    Messenger
                  </a>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-main">Mails</label>
                {isEditing ? (
                  <>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {form.watch('mail')?.map((email, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {email}
                          <button
                            type="button"
                            onClick={() => removeEmail(email)}
                            className="ml-1 rounded-full hover:bg-muted"
                            aria-label={`Remove email ${email}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addEmail}
                      >
                        Add
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-900 mt-1">
                    {website.mail?.join(', ')}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <Heading name="Social Media" />
              {socials.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 mt-1">
                  <span className="text-main flex items-center gap-1 font-bold text-md">
                    {item.icon} {item.label}:
                  </span>
                  {isEditing ? (
                    <Input
                      {...form.register(item.name as any)}
                      className="flex-1"
                    />
                  ) : (
                    <a
                      href={getHref(website[item.name as keyof typeof website])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600"
                    >
                      VietStrix
                    </a>
                  )}
                </div>
              ))}
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default WebsiteCard;
