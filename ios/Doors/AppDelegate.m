/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
// 热更新引入
//#import "DoctorStrangeUpdater.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "LinkingIOS/RCTLinkingManager.h"

#import "QYSDK.h"
#import "Pingpp.h"
#import <SMS_SDK/Extend/SMSSDK+AddressBookMethods.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Doors"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

   //defaultJSCodeLocation is needed at least for the first startup
  
  
//  NSURL* defaultJSCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//  
//  DoctorStrangeUpdater* updater = [DoctorStrangeUpdater sharedInstance];
//  
//  NSURL* defaultMetadataFileLocation = [[NSBundle mainBundle] URLForResource:@"metadata" withExtension:@"json"];
//  
//  [updater initializeWithUpdateMetadataUrl:defaultJSCodeLocation defaultMetadataFileLocation: defaultMetadataFileLocation];
//  
//  
//  NSURL* latestJSCodeLocation = [updater latestJSCodeLocation];
//  
//  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIViewController *rootViewController = [UIViewController new];
//  self.window.rootViewController = rootViewController;
//  RCTBridge* bridge = [[RCTBridge alloc] initWithBundleURL:latestJSCodeLocation moduleProvider:nil launchOptions:nil];
////  RCTRootView* rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"UrAPP" initialProperties:nil];
//  self.window.rootViewController.view = rootView;
//  [self.window makeKeyAndVisible];
  
  
  //注册 APNS
  if ([[UIApplication sharedApplication]
       respondsToSelector:@selector(registerForRemoteNotifications)])
  {
    UIUserNotificationType types = UIUserNotificationTypeBadge
    | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;
    UIUserNotificationSettings *settings =
    [UIUserNotificationSettings settingsForTypes:types categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
  }
  else
  {
    UIUserNotificationType types = UIUserNotificationTypeAlert
    | UIUserNotificationTypeSound | UIUserNotificationTypeBadge;
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:types];
  }
  
  [Pingpp setDebugMode:YES];
  

  [SMSSDK enableAppContactFriends:NO];
  
  return YES;
}

- (void)application:(UIApplication *)app
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [SMSSDK enableAppContactFriends:NO];
  [[QYSDK sharedSDK] updateApnsToken:deviceToken];

}

// for iOS 9
//- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary *)options {
//  return [Pingpp handleOpenURL:url withCompletion:nil];
//}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  
  if([[url host] isEqualToString:@"oauth"]) {
    return [RCTLinkingManager application:application openURL:url
                        sourceApplication:sourceApplication annotation:annotation];
  } else if ([[url host] isEqualToString:@"pay"]){
    return [Pingpp handleOpenURL:url withCompletion:nil];
  }
  return NO;
}
@end
