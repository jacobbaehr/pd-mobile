// RCTPDMigrator.m
#import "RCTPDMigrator.h"
#import <React/RCTLog.h>
#import "CoreDataHelper.h"

@implementation RCTPDMigrator {
  bool hasListeners;
}

// To export a module named RCTPDMigrator
RCT_EXPORT_MODULE();

// Will be called when this module's first listener is added.
-(void)startObserving {
  hasListeners = YES;
  // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
  hasListeners = NO;
  // Remove upstream listeners, stop unnecessary background tasks
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"num_pools", @"pool"];
}

- (void)sendNumPools:(NSNumber *)numPools {
  if (hasListeners) {
    [self sendEventWithName:@"num_pools" body:numPools];
  }
}

- (void)sendPool:(NSManagedObject *)pool {
  if (hasListeners) {
    NSDate *modifiedDate = [pool valueForKey:@"modified_at"];
    
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];
    [dateFormatter setLocale:enUSPOSIXLocale];
    [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
    [dateFormatter setCalendar:[NSCalendar calendarWithIdentifier:NSCalendarIdentifierGregorian]];

    NSString *iso8601String = [dateFormatter stringFromDate:modifiedDate];
    
    [self sendEventWithName:@"pool" body:@{
      @"name": [pool valueForKey:@"name"],
      @"volume": [pool valueForKey:@"volume"],
      @"isGallons": [pool valueForKey:@"isGallons"],
      @"type": [pool valueForKey:@"type"],
      @"modified_at": iso8601String,
    }];
  }
}

RCT_EXPORT_METHOD(countPools) {
  NSNumber *totalPools = @([[[CoreDataHelper sharedManager] getAllPools] count]);
  [self sendNumPools:totalPools];
}

RCT_EXPORT_METHOD(importAllPools) {
  NSArray *pools = [[CoreDataHelper sharedManager] getAllPools];
  for (NSManagedObject *p in pools) {
    [self sendPool:p];
  }
}

RCT_EXPORT_METHOD(countPools:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSNumber *totalPools = @([[[CoreDataHelper sharedManager] getAllPools] count]);
  resolve(totalPools);
}

@end
