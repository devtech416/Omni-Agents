import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type InstagramMessageModel = runtime.Types.Result.DefaultSelection<Prisma.$InstagramMessagePayload>;
export type AggregateInstagramMessage = {
    _count: InstagramMessageCountAggregateOutputType | null;
    _min: InstagramMessageMinAggregateOutputType | null;
    _max: InstagramMessageMaxAggregateOutputType | null;
};
export type InstagramMessageMinAggregateOutputType = {
    id: string | null;
    leadId: string | null;
    senderId: string | null;
    text: string | null;
    direction: string | null;
    timestamp: Date | null;
};
export type InstagramMessageMaxAggregateOutputType = {
    id: string | null;
    leadId: string | null;
    senderId: string | null;
    text: string | null;
    direction: string | null;
    timestamp: Date | null;
};
export type InstagramMessageCountAggregateOutputType = {
    id: number;
    leadId: number;
    senderId: number;
    text: number;
    direction: number;
    timestamp: number;
    _all: number;
};
export type InstagramMessageMinAggregateInputType = {
    id?: true;
    leadId?: true;
    senderId?: true;
    text?: true;
    direction?: true;
    timestamp?: true;
};
export type InstagramMessageMaxAggregateInputType = {
    id?: true;
    leadId?: true;
    senderId?: true;
    text?: true;
    direction?: true;
    timestamp?: true;
};
export type InstagramMessageCountAggregateInputType = {
    id?: true;
    leadId?: true;
    senderId?: true;
    text?: true;
    direction?: true;
    timestamp?: true;
    _all?: true;
};
export type InstagramMessageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstagramMessageWhereInput;
    orderBy?: Prisma.InstagramMessageOrderByWithRelationInput | Prisma.InstagramMessageOrderByWithRelationInput[];
    cursor?: Prisma.InstagramMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InstagramMessageCountAggregateInputType;
    _min?: InstagramMessageMinAggregateInputType;
    _max?: InstagramMessageMaxAggregateInputType;
};
export type GetInstagramMessageAggregateType<T extends InstagramMessageAggregateArgs> = {
    [P in keyof T & keyof AggregateInstagramMessage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInstagramMessage[P]> : Prisma.GetScalarType<T[P], AggregateInstagramMessage[P]>;
};
export type InstagramMessageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstagramMessageWhereInput;
    orderBy?: Prisma.InstagramMessageOrderByWithAggregationInput | Prisma.InstagramMessageOrderByWithAggregationInput[];
    by: Prisma.InstagramMessageScalarFieldEnum[] | Prisma.InstagramMessageScalarFieldEnum;
    having?: Prisma.InstagramMessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InstagramMessageCountAggregateInputType | true;
    _min?: InstagramMessageMinAggregateInputType;
    _max?: InstagramMessageMaxAggregateInputType;
};
export type InstagramMessageGroupByOutputType = {
    id: string;
    leadId: string;
    senderId: string;
    text: string;
    direction: string;
    timestamp: Date;
    _count: InstagramMessageCountAggregateOutputType | null;
    _min: InstagramMessageMinAggregateOutputType | null;
    _max: InstagramMessageMaxAggregateOutputType | null;
};
type GetInstagramMessageGroupByPayload<T extends InstagramMessageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InstagramMessageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InstagramMessageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InstagramMessageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InstagramMessageGroupByOutputType[P]>;
}>>;
export type InstagramMessageWhereInput = {
    AND?: Prisma.InstagramMessageWhereInput | Prisma.InstagramMessageWhereInput[];
    OR?: Prisma.InstagramMessageWhereInput[];
    NOT?: Prisma.InstagramMessageWhereInput | Prisma.InstagramMessageWhereInput[];
    id?: Prisma.StringFilter<"InstagramMessage"> | string;
    leadId?: Prisma.StringFilter<"InstagramMessage"> | string;
    senderId?: Prisma.StringFilter<"InstagramMessage"> | string;
    text?: Prisma.StringFilter<"InstagramMessage"> | string;
    direction?: Prisma.StringFilter<"InstagramMessage"> | string;
    timestamp?: Prisma.DateTimeFilter<"InstagramMessage"> | Date | string;
    lead?: Prisma.XOR<Prisma.LeadScalarRelationFilter, Prisma.LeadWhereInput>;
};
export type InstagramMessageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    leadId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    lead?: Prisma.LeadOrderByWithRelationInput;
};
export type InstagramMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.InstagramMessageWhereInput | Prisma.InstagramMessageWhereInput[];
    OR?: Prisma.InstagramMessageWhereInput[];
    NOT?: Prisma.InstagramMessageWhereInput | Prisma.InstagramMessageWhereInput[];
    leadId?: Prisma.StringFilter<"InstagramMessage"> | string;
    senderId?: Prisma.StringFilter<"InstagramMessage"> | string;
    text?: Prisma.StringFilter<"InstagramMessage"> | string;
    direction?: Prisma.StringFilter<"InstagramMessage"> | string;
    timestamp?: Prisma.DateTimeFilter<"InstagramMessage"> | Date | string;
    lead?: Prisma.XOR<Prisma.LeadScalarRelationFilter, Prisma.LeadWhereInput>;
}, "id">;
export type InstagramMessageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    leadId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    _count?: Prisma.InstagramMessageCountOrderByAggregateInput;
    _max?: Prisma.InstagramMessageMaxOrderByAggregateInput;
    _min?: Prisma.InstagramMessageMinOrderByAggregateInput;
};
export type InstagramMessageScalarWhereWithAggregatesInput = {
    AND?: Prisma.InstagramMessageScalarWhereWithAggregatesInput | Prisma.InstagramMessageScalarWhereWithAggregatesInput[];
    OR?: Prisma.InstagramMessageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InstagramMessageScalarWhereWithAggregatesInput | Prisma.InstagramMessageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"InstagramMessage"> | string;
    leadId?: Prisma.StringWithAggregatesFilter<"InstagramMessage"> | string;
    senderId?: Prisma.StringWithAggregatesFilter<"InstagramMessage"> | string;
    text?: Prisma.StringWithAggregatesFilter<"InstagramMessage"> | string;
    direction?: Prisma.StringWithAggregatesFilter<"InstagramMessage"> | string;
    timestamp?: Prisma.DateTimeWithAggregatesFilter<"InstagramMessage"> | Date | string;
};
export type InstagramMessageCreateInput = {
    id?: string;
    senderId: string;
    text: string;
    direction: string;
    timestamp?: Date | string;
    lead: Prisma.LeadCreateNestedOneWithoutMessagesInput;
};
export type InstagramMessageUncheckedCreateInput = {
    id?: string;
    leadId: string;
    senderId: string;
    text: string;
    direction: string;
    timestamp?: Date | string;
};
export type InstagramMessageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.LeadUpdateOneRequiredWithoutMessagesNestedInput;
};
export type InstagramMessageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    leadId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramMessageCreateManyInput = {
    id?: string;
    leadId: string;
    senderId: string;
    text: string;
    direction: string;
    timestamp?: Date | string;
};
export type InstagramMessageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramMessageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    leadId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramMessageListRelationFilter = {
    every?: Prisma.InstagramMessageWhereInput;
    some?: Prisma.InstagramMessageWhereInput;
    none?: Prisma.InstagramMessageWhereInput;
};
export type InstagramMessageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InstagramMessageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    leadId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type InstagramMessageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    leadId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type InstagramMessageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    leadId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type InstagramMessageCreateNestedManyWithoutLeadInput = {
    create?: Prisma.XOR<Prisma.InstagramMessageCreateWithoutLeadInput, Prisma.InstagramMessageUncheckedCreateWithoutLeadInput> | Prisma.InstagramMessageCreateWithoutLeadInput[] | Prisma.InstagramMessageUncheckedCreateWithoutLeadInput[];
    connectOrCreate?: Prisma.InstagramMessageCreateOrConnectWithoutLeadInput | Prisma.InstagramMessageCreateOrConnectWithoutLeadInput[];
    createMany?: Prisma.InstagramMessageCreateManyLeadInputEnvelope;
    connect?: Prisma.InstagramMessageWhereUniqueInput | Prisma.InstagramMessageWhereUniqueInput[];
};
export type InstagramMessageUncheckedCreateNestedManyWithoutLeadInput = {
    create?: Prisma.XOR<Prisma.InstagramMessageCreateWithoutLeadInput, Prisma.InstagramMessageUncheckedCreateWithoutLeadInput> | Prisma.InstagramMessageCreateWithoutLeadInput[] | Prisma.InstagramMessageUncheckedCreateWithoutLeadInput[];
    connectOrCreate?: Prisma.InstagramMessageCreateOrConnectWithoutLeadInput | Prisma.InstagramMessageCreateOrConnectWithoutLeadInput[];
    createMany?: Prisma.InstagramMessageCreateManyLeadInputEnvelope;
    connect?: Prisma.InstagramMessageWhereUniqueInput | Prisma.InstagramMessageWhereUniqueInput[];
};
export type InstagramMessageUpdateManyWithoutLeadNestedInput = {
    create?: Prisma.XOR<Prisma.InstagramMessageCreateWithoutLeadInput, Prisma.InstagramMessageUncheckedCreateWithoutLeadInput> | Prisma.InstagramMessageCreateWithoutLeadInput[] | Prisma.InstagramMessageUncheckedCreateWithoutLeadInput[];
    connectOrCreate?: Prisma.InstagramMessageCreateOrConnectWithoutLeadInput | Prisma.InstagramMessageCreateOrConnectWithoutLeadInput[];
    upsert?: Prisma.InstagramMessageUpsertWithWhereUniqueWithoutLeadInput | Prisma.InstagramMessageUpsertWithWhereUniqueWithoutLeadInput[];
    createMany?: Prisma.InstagramMessageCreateManyLeadInputEnvelope;
    set?: Prisma.InstagramMessageWhereUniqueInput | Prisma.InstagramMessageWhereUniqueInput[];
    disconnect?: Prisma.InstagramMessageWhereUniqueInput | Prisma.InstagramMessageWhereUniqueInput[];
    delete?: Prisma.InstagramMessageWhereUniqueInput | Prisma.InstagramMessageWhereUniqueInput[];
    connect?: Prisma.InstagramMessageWhereUniqueInput | Prisma.InstagramMessageWhereUniqueInput[];
    update?: Prisma.InstagramMessageUpdateWithWhereUniqueWithoutLeadInput | Prisma.InstagramMessageUpdateWithWhereUniqueWithoutLeadInput[];
    updateMany?: Prisma.InstagramMessageUpdateManyWithWhereWithoutLeadInput | Prisma.InstagramMessageUpdateManyWithWhereWithoutLeadInput[];
    deleteMany?: Prisma.InstagramMessageScalarWhereInput | Prisma.InstagramMessageScalarWhereInput[];
};
export type InstagramMessageUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: Prisma.XOR<Prisma.InstagramMessageCreateWithoutLeadInput, Prisma.InstagramMessageUncheckedCreateWithoutLeadInput> | Prisma.InstagramMessageCreateWithoutLeadInput[] | Prisma.InstagramMessageUncheckedCreateWithoutLeadInput[];
    connectOrCreate?: Prisma.InstagramMessageCreateOrConnectWithoutLeadInput | Prisma.InstagramMessageCreateOrConnectWithoutLeadInput[];
    upsert?: Prisma.InstagramMessageUpsertWithWhereUniqueWithoutLeadInput | Prisma.InstagramMessageUpsertWithWhereUniqueWithoutLeadInput[];
    createMany?: Prisma.InstagramMessageCreateManyLeadInputEnvelope;
    set?: Prisma.InstagramMessageWhereUniqueInput | Prisma.InstagramMessageWhereUniqueInput[];
    disconnect?: Prisma.InstagramMessageWhereUniqueInput | Prisma.InstagramMessageWhereUniqueInput[];
    delete?: Prisma.InstagramMessageWhereUniqueInput | Prisma.InstagramMessageWhereUniqueInput[];
    connect?: Prisma.InstagramMessageWhereUniqueInput | Prisma.InstagramMessageWhereUniqueInput[];
    update?: Prisma.InstagramMessageUpdateWithWhereUniqueWithoutLeadInput | Prisma.InstagramMessageUpdateWithWhereUniqueWithoutLeadInput[];
    updateMany?: Prisma.InstagramMessageUpdateManyWithWhereWithoutLeadInput | Prisma.InstagramMessageUpdateManyWithWhereWithoutLeadInput[];
    deleteMany?: Prisma.InstagramMessageScalarWhereInput | Prisma.InstagramMessageScalarWhereInput[];
};
export type InstagramMessageCreateWithoutLeadInput = {
    id?: string;
    senderId: string;
    text: string;
    direction: string;
    timestamp?: Date | string;
};
export type InstagramMessageUncheckedCreateWithoutLeadInput = {
    id?: string;
    senderId: string;
    text: string;
    direction: string;
    timestamp?: Date | string;
};
export type InstagramMessageCreateOrConnectWithoutLeadInput = {
    where: Prisma.InstagramMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstagramMessageCreateWithoutLeadInput, Prisma.InstagramMessageUncheckedCreateWithoutLeadInput>;
};
export type InstagramMessageCreateManyLeadInputEnvelope = {
    data: Prisma.InstagramMessageCreateManyLeadInput | Prisma.InstagramMessageCreateManyLeadInput[];
    skipDuplicates?: boolean;
};
export type InstagramMessageUpsertWithWhereUniqueWithoutLeadInput = {
    where: Prisma.InstagramMessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.InstagramMessageUpdateWithoutLeadInput, Prisma.InstagramMessageUncheckedUpdateWithoutLeadInput>;
    create: Prisma.XOR<Prisma.InstagramMessageCreateWithoutLeadInput, Prisma.InstagramMessageUncheckedCreateWithoutLeadInput>;
};
export type InstagramMessageUpdateWithWhereUniqueWithoutLeadInput = {
    where: Prisma.InstagramMessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.InstagramMessageUpdateWithoutLeadInput, Prisma.InstagramMessageUncheckedUpdateWithoutLeadInput>;
};
export type InstagramMessageUpdateManyWithWhereWithoutLeadInput = {
    where: Prisma.InstagramMessageScalarWhereInput;
    data: Prisma.XOR<Prisma.InstagramMessageUpdateManyMutationInput, Prisma.InstagramMessageUncheckedUpdateManyWithoutLeadInput>;
};
export type InstagramMessageScalarWhereInput = {
    AND?: Prisma.InstagramMessageScalarWhereInput | Prisma.InstagramMessageScalarWhereInput[];
    OR?: Prisma.InstagramMessageScalarWhereInput[];
    NOT?: Prisma.InstagramMessageScalarWhereInput | Prisma.InstagramMessageScalarWhereInput[];
    id?: Prisma.StringFilter<"InstagramMessage"> | string;
    leadId?: Prisma.StringFilter<"InstagramMessage"> | string;
    senderId?: Prisma.StringFilter<"InstagramMessage"> | string;
    text?: Prisma.StringFilter<"InstagramMessage"> | string;
    direction?: Prisma.StringFilter<"InstagramMessage"> | string;
    timestamp?: Prisma.DateTimeFilter<"InstagramMessage"> | Date | string;
};
export type InstagramMessageCreateManyLeadInput = {
    id?: string;
    senderId: string;
    text: string;
    direction: string;
    timestamp?: Date | string;
};
export type InstagramMessageUpdateWithoutLeadInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramMessageUncheckedUpdateWithoutLeadInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramMessageUncheckedUpdateManyWithoutLeadInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramMessageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    leadId?: boolean;
    senderId?: boolean;
    text?: boolean;
    direction?: boolean;
    timestamp?: boolean;
    lead?: boolean | Prisma.LeadDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["instagramMessage"]>;
export type InstagramMessageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    leadId?: boolean;
    senderId?: boolean;
    text?: boolean;
    direction?: boolean;
    timestamp?: boolean;
    lead?: boolean | Prisma.LeadDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["instagramMessage"]>;
export type InstagramMessageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    leadId?: boolean;
    senderId?: boolean;
    text?: boolean;
    direction?: boolean;
    timestamp?: boolean;
    lead?: boolean | Prisma.LeadDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["instagramMessage"]>;
export type InstagramMessageSelectScalar = {
    id?: boolean;
    leadId?: boolean;
    senderId?: boolean;
    text?: boolean;
    direction?: boolean;
    timestamp?: boolean;
};
export type InstagramMessageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "leadId" | "senderId" | "text" | "direction" | "timestamp", ExtArgs["result"]["instagramMessage"]>;
export type InstagramMessageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lead?: boolean | Prisma.LeadDefaultArgs<ExtArgs>;
};
export type InstagramMessageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lead?: boolean | Prisma.LeadDefaultArgs<ExtArgs>;
};
export type InstagramMessageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lead?: boolean | Prisma.LeadDefaultArgs<ExtArgs>;
};
export type $InstagramMessagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InstagramMessage";
    objects: {
        lead: Prisma.$LeadPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        leadId: string;
        senderId: string;
        text: string;
        direction: string;
        timestamp: Date;
    }, ExtArgs["result"]["instagramMessage"]>;
    composites: {};
};
export type InstagramMessageGetPayload<S extends boolean | null | undefined | InstagramMessageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload, S>;
export type InstagramMessageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InstagramMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InstagramMessageCountAggregateInputType | true;
};
export interface InstagramMessageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InstagramMessage'];
        meta: {
            name: 'InstagramMessage';
        };
    };
    findUnique<T extends InstagramMessageFindUniqueArgs>(args: Prisma.SelectSubset<T, InstagramMessageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InstagramMessageClient<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InstagramMessageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InstagramMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstagramMessageClient<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InstagramMessageFindFirstArgs>(args?: Prisma.SelectSubset<T, InstagramMessageFindFirstArgs<ExtArgs>>): Prisma.Prisma__InstagramMessageClient<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InstagramMessageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InstagramMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstagramMessageClient<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InstagramMessageFindManyArgs>(args?: Prisma.SelectSubset<T, InstagramMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InstagramMessageCreateArgs>(args: Prisma.SelectSubset<T, InstagramMessageCreateArgs<ExtArgs>>): Prisma.Prisma__InstagramMessageClient<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InstagramMessageCreateManyArgs>(args?: Prisma.SelectSubset<T, InstagramMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InstagramMessageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InstagramMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InstagramMessageDeleteArgs>(args: Prisma.SelectSubset<T, InstagramMessageDeleteArgs<ExtArgs>>): Prisma.Prisma__InstagramMessageClient<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InstagramMessageUpdateArgs>(args: Prisma.SelectSubset<T, InstagramMessageUpdateArgs<ExtArgs>>): Prisma.Prisma__InstagramMessageClient<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InstagramMessageDeleteManyArgs>(args?: Prisma.SelectSubset<T, InstagramMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InstagramMessageUpdateManyArgs>(args: Prisma.SelectSubset<T, InstagramMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InstagramMessageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InstagramMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InstagramMessageUpsertArgs>(args: Prisma.SelectSubset<T, InstagramMessageUpsertArgs<ExtArgs>>): Prisma.Prisma__InstagramMessageClient<runtime.Types.Result.GetResult<Prisma.$InstagramMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InstagramMessageCountArgs>(args?: Prisma.Subset<T, InstagramMessageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InstagramMessageCountAggregateOutputType> : number>;
    aggregate<T extends InstagramMessageAggregateArgs>(args: Prisma.Subset<T, InstagramMessageAggregateArgs>): Prisma.PrismaPromise<GetInstagramMessageAggregateType<T>>;
    groupBy<T extends InstagramMessageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InstagramMessageGroupByArgs['orderBy'];
    } : {
        orderBy?: InstagramMessageGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InstagramMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstagramMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InstagramMessageFieldRefs;
}
export interface Prisma__InstagramMessageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lead<T extends Prisma.LeadDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LeadDefaultArgs<ExtArgs>>): Prisma.Prisma__LeadClient<runtime.Types.Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InstagramMessageFieldRefs {
    readonly id: Prisma.FieldRef<"InstagramMessage", 'String'>;
    readonly leadId: Prisma.FieldRef<"InstagramMessage", 'String'>;
    readonly senderId: Prisma.FieldRef<"InstagramMessage", 'String'>;
    readonly text: Prisma.FieldRef<"InstagramMessage", 'String'>;
    readonly direction: Prisma.FieldRef<"InstagramMessage", 'String'>;
    readonly timestamp: Prisma.FieldRef<"InstagramMessage", 'DateTime'>;
}
export type InstagramMessageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelect<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    include?: Prisma.InstagramMessageInclude<ExtArgs> | null;
    where: Prisma.InstagramMessageWhereUniqueInput;
};
export type InstagramMessageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelect<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    include?: Prisma.InstagramMessageInclude<ExtArgs> | null;
    where: Prisma.InstagramMessageWhereUniqueInput;
};
export type InstagramMessageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelect<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    include?: Prisma.InstagramMessageInclude<ExtArgs> | null;
    where?: Prisma.InstagramMessageWhereInput;
    orderBy?: Prisma.InstagramMessageOrderByWithRelationInput | Prisma.InstagramMessageOrderByWithRelationInput[];
    cursor?: Prisma.InstagramMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstagramMessageScalarFieldEnum | Prisma.InstagramMessageScalarFieldEnum[];
};
export type InstagramMessageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelect<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    include?: Prisma.InstagramMessageInclude<ExtArgs> | null;
    where?: Prisma.InstagramMessageWhereInput;
    orderBy?: Prisma.InstagramMessageOrderByWithRelationInput | Prisma.InstagramMessageOrderByWithRelationInput[];
    cursor?: Prisma.InstagramMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstagramMessageScalarFieldEnum | Prisma.InstagramMessageScalarFieldEnum[];
};
export type InstagramMessageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelect<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    include?: Prisma.InstagramMessageInclude<ExtArgs> | null;
    where?: Prisma.InstagramMessageWhereInput;
    orderBy?: Prisma.InstagramMessageOrderByWithRelationInput | Prisma.InstagramMessageOrderByWithRelationInput[];
    cursor?: Prisma.InstagramMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstagramMessageScalarFieldEnum | Prisma.InstagramMessageScalarFieldEnum[];
};
export type InstagramMessageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelect<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    include?: Prisma.InstagramMessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstagramMessageCreateInput, Prisma.InstagramMessageUncheckedCreateInput>;
};
export type InstagramMessageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InstagramMessageCreateManyInput | Prisma.InstagramMessageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InstagramMessageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    data: Prisma.InstagramMessageCreateManyInput | Prisma.InstagramMessageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InstagramMessageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InstagramMessageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelect<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    include?: Prisma.InstagramMessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstagramMessageUpdateInput, Prisma.InstagramMessageUncheckedUpdateInput>;
    where: Prisma.InstagramMessageWhereUniqueInput;
};
export type InstagramMessageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InstagramMessageUpdateManyMutationInput, Prisma.InstagramMessageUncheckedUpdateManyInput>;
    where?: Prisma.InstagramMessageWhereInput;
    limit?: number;
};
export type InstagramMessageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstagramMessageUpdateManyMutationInput, Prisma.InstagramMessageUncheckedUpdateManyInput>;
    where?: Prisma.InstagramMessageWhereInput;
    limit?: number;
    include?: Prisma.InstagramMessageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InstagramMessageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelect<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    include?: Prisma.InstagramMessageInclude<ExtArgs> | null;
    where: Prisma.InstagramMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstagramMessageCreateInput, Prisma.InstagramMessageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InstagramMessageUpdateInput, Prisma.InstagramMessageUncheckedUpdateInput>;
};
export type InstagramMessageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelect<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    include?: Prisma.InstagramMessageInclude<ExtArgs> | null;
    where: Prisma.InstagramMessageWhereUniqueInput;
};
export type InstagramMessageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstagramMessageWhereInput;
    limit?: number;
};
export type InstagramMessageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramMessageSelect<ExtArgs> | null;
    omit?: Prisma.InstagramMessageOmit<ExtArgs> | null;
    include?: Prisma.InstagramMessageInclude<ExtArgs> | null;
};
export {};
